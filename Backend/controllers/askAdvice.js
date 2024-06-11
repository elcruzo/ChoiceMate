const { OpenAI } = require("openai");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const askAdvice = async (req, res) => {
  try {
    const { question } = req.body;
    const system = `
   These are some of the default questions, although there is an option for users to ask custom questions.
   "What should I eat for dinner?", "What school should I attend?", "What stocks should I invest?", "What's on your mind?"
    You are a decision-making assistant. Given the following question, please provide a detailed response that includes:
  1. A list of 4 options.
  2. The upsides and downsides of each option.
  3. A recommendation of the best option.
  4. Statistics or plots to back the recommendation.

  Question: ${question}

  Response:
  1. Options:
   a. Option 1: [Description]
      - Upsides: [List of upsides]
      - Downsides: [List of downsides]
   b. Option 2: [Description]
      - Upsides: [List of upsides]
      - Downsides: [List of downsides]
   c. Option 3: [Description]
      - Upsides: [List of upsides]
      - Downsides: [List of downsides]
   d. Option 4: [Description]
      - Upsides: [List of upsides]
      - Downsides: [List of downsides]

  2. Recommendation:
   Based on the above analysis, the best option is [Best Option]. This is recommended because [Reason for recommendation].

  3. Supporting Statistics:
   - [Statistic 1]
   - [Statistic 2]
   - [Any relevant plots or charts if applicable]
    `;

    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: system },
        { role: "user", content: question },
      ],
      model: "gpt-3.5-turbo",
    });

    if (!completion) {
      return res.status(500).json({ error: "Failed to generate response" });
    }

    return res
      .status(200)
      .json({ response: completion.choices[0].message.content });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {askAdvice};
