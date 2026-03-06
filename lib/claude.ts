import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-4-20250514" as const;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateOptions {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
}

export function streamGenerate({
  systemPrompt,
  userPrompt,
  maxTokens = 2000,
}: GenerateOptions) {
  return client.messages.stream({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });
}

export function claudeStreamToSSE(
  claudeStream: ReturnType<typeof streamGenerate>
): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
              )
            );
          }
        }
        const finalMessage = await claudeStream.finalMessage();
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              done: true,
              usage: finalMessage.usage,
            })}\n\n`
          )
        );
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Generation failed";
        console.error("[Claude API Error]", message);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: message })}\n\n`
          )
        );
        controller.close();
      }
    },
  });
}
