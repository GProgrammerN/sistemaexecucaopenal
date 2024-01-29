import { openai } from "../../../../lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {

  const { promptMessage } = await req.json();

  const response = await openai.chat.completions.create({
      model: "gpt-4-0613",
      //model: "gpt-3.5-turbo-16k",
      temperature: 0.5,
      stream: true,
      messages: [{ role: "user", content: promptMessage }],
});

    // Transform the response into a readable stream
    const stream = OpenAIStream(response);

    // Return a StreamingTextResponse, which can be consumed by the client
    return new StreamingTextResponse(stream);

  }
