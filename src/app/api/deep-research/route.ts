export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const lastMessageContent = messages[messages.length - 1].content;

    const parsed = JSON.parse(lastMessageContent);

    const topic = parsed.topic;
    const clarifications = parsed.clarifications;

    console.log("Topic:", topic);
    console.log("Clarifications:", clarifications);

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error ? error.message : "Invalid message format!",
      }),
      {
        status: 500,
      }
    );
  }
}
