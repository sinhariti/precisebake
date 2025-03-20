const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const { GoogleAIFileManager } = require("@google/generative-ai/server");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  /**
   * Uploads the given file to Gemini.
   *
   * See https://ai.google.dev/gemini-api/docs/prompting_with_media
   */
  async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  /**
   * Waits for the given files to be active.
   *
   * Some files uploaded to the Gemini API need to be processed before they can
   * be used as prompt inputs. The status can be seen by querying the file's
   * "state" field.
   *
   * This implementation uses a simple blocking polling loop. Production code
   * should probably employ a more sophisticated approach.
   */
  async function waitForFilesActive(files) {
    console.log("Waiting for file processing...");
    for (const name of files.map((file) => file.name)) {
      let file = await fileManager.getFile(name);
      while (file.state === "PROCESSING") {
        process.stdout.write(".")
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(name)
      }
      if (file.state !== "ACTIVE") {
        throw Error(`File ${file.name} failed to process`);
      }
    }
    console.log("...all files ready\n");
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    // TODO Make these files available on the local file system
    // You may need to update the file paths
    const files = [
      await uploadToGemini("ingridients_list.json", "application/json"),
    ];
  
    // Some files have a processing delay. Wait for them to be ready.
    await waitForFilesActive(files);
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
            {text: "what is the weight of 2 cup of milk in grams calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation using the density.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "{\"Assumption\": \"Using the density of whole milk, as no specific type of milk was requested.\", \"calculation\": \"2 cups * 240 ml/cup * 1.03 g/ml = 494.4 g\", \"weight\": \"2 cups of milk weighs 494.4 grams.\"}"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is the weight of 2 teaspoons of peanut butter in kilograms calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation using the density. dont return assumption if no assumption are made."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"calculation\": \"2 tsp * 5 ml/tsp * 1.1 g/ml * 0.001 kg/g= 0.011 kg\",\n  \"weight\": \"2 teaspoons of peanut butter weighs 0.011 kilograms.\"\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is the weight of 2 teaspoons of coffee in kilograms calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation using the density. dont return assumption if no assumption are made."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"assumption\": \"Using the density of Espresso powder as no specific type of coffee was provided.\",\n  \"calculation\": \"2 tsp * 5 ml/tsp * 0.5 g/ml * 0.001 kg/g = 0.005 kg\",\n  \"weight\": \"2 teaspoons of coffee weighs 0.005 kilograms.\"\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is the weight of 2 teaspoons of coffee in kilograms calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation using the density. dont return assumption if no assumption are made."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"assumption\": \"Using the density of Espresso powder, as no specific type of coffee (e.g., ground, instant) was provided.\",\n  \"calculation\": \"2 tsp * 5 ml/tsp * 0.5 g/ml * 0.001 kg/g = 0.005 kg\",\n  \"weight\": \"2 teaspoons of coffee weighs 0.005 kilograms.\"\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is the weight of 2 teaspoons of coffee in grams calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation what is the weight of 2 teaspoons of coffee in kilograms calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation using the density. dont return assumption if no assumption are made."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"assumption\": \"Using the density of Espresso powder, as no specific type of coffee (e.g., ground, instant) was provided.\",\n  \"calculation\": \"2 tsp * 5 ml/tsp * 0.5 g/ml = 5 g\",\n  \"weight\": \"2 teaspoons of coffee weighs 5 grams.\"\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is the weight of 5 table spoon of flour in grams calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation what is the weight of 2 teaspoons of coffee in kilograms calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation using the density. dont return assumption if no assumption are made. "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"assumption\": \"Using the density of All-purpose flour, as no specific type of flour was provided.\",\n  \"calculation\": \"5 tbsp * 15 ml/tbsp * 0.521 g/ml = 39.075 g\",\n  \"weight\": \"5 tablespoons of flour weighs 39.075 grams.\"\n}\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what is the weight of 5 table spoon of flour in grams calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation what is the weight of 2 teaspoons of coffee in kilograms calculate using the density given in the json list. return the  exact weight in one property as a sentence , assumptions if any and calculation using the density. dont return assumption if no assumption are made. \n1 table spoon = 14.7868 ml\n1 teaspoon = 4.92892 ml\n1 cup = 250 ml\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"assumption\": \"Using the density of All-purpose flour, as no specific type of flour was provided.\",\n  \"calculation\": \"5 tbsp * 14.7868 ml/tbsp * 0.521 g/ml = 38.525 g\",\n  \"weight\": \"5 tablespoons of flour weighs 38.525 grams.\"\n}\n```\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();