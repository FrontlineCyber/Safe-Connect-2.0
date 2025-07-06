const OpenAI = require("openai");
const openai = new OpenAI();

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message provided" }),
      };
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content:
            "You are a Zen forest guide and friendly response coordinator helping users with cybersecurity questions in a calm, reassuring tone.",
        },
        { role: "user", content: message },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: completion.choices[0].message.content.trim(),
      }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
};
