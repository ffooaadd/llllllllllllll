import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    // استخراج آخر رسالة من المستخدم
    const userMessage = messages?.[messages.length - 1]?.content;

    if (!userMessage) {
      return NextResponse.json(
        { error: "لم يتم إرسال رسالة من المستخدم." },
        { status: 400 }
      );
    }

    // إرسال الطلب إلى Hugging Face Public Inference API
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: userMessage,
        }),
      }
    );

    const data = await hfResponse.json();

    // استخراج الرد من الذكاء الاصطناعي
    const reply = data?.generated_text || data?.[0]?.generated_text || "❌ لم يصل رد من AI.";

    return NextResponse.json({
      role: "assistant",
      content: reply,
    });
  } catch (error) {
    console.error("HuggingFace API Error:", error);
    return NextResponse.json(
      { error: "❌ خطأ في الاتصال بـ HuggingFace API." },
      { status: 500 }
    );
  }
}
