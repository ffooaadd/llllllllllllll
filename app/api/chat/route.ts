
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openaiApiKey = "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";
  const endpoint = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response from OpenAI API.";

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "API Error", details: error }, { status: 500 });
  }
}
