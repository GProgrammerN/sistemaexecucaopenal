import { streamToResponse, OpenAIStream } from "ai";
import { openai } from "../lib/openai";

export default async (req, res) => {
  if (req.method === "POST") {
    const promptMessage = JSON.parse(req.body);
    const response = await openai.chat.completions.create({
//      model: "gpt-4-0613",
      model: "gpt-3.5-turbo-16k",
      temperature: 0.5,
      messages: [{ role: "user", content: promptMessage }],
    });

    //console.log(response.choices[0].message.content);

   //   return response.choices[0].message.content
    res.status(200).json({text: response.choices[0].message.content});

    /*    const stream = OpenAIStream(response);

    streamToResponse(stream, res.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    });*/
  }
};
