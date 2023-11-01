import { openai } from "../lib/openai";

export default async (req, res) => {
  if (req.method === "POST") {
    const promptMessage = JSON.parse(req.body);
    const response = await openai.chat.completions.create({
      model: "gpt-4-0613",
      //model: "gpt-3.5-turbo-16k",
      temperature: 0.5,
      messages: [{ role: "user", content: promptMessage }],
    });

     res.status(200).json({ text: response.choices[0].message.content });

  }
};
