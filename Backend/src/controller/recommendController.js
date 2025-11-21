const axios = require("axios");

const getRecommendations = async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "items must be an array" });
  }

  try {
    const prompt = `
      Based on this items list: ${items.join(", ")},
      suggest 5 additional shop items that people often forget.
      For each item, also give an estimated price in your currency.
      Respond with a JSON array of objects:
      [
        { "name": "Milk", "estimated_price": 60 },
        ...
      ]
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "X-Title": "LetsTrackIt Grocery AI",
        },
      }
    );

    let aiText = response.data.choices[0].message.content;

    // ---------- FIX JSON FROM AI ----------
    // remove ```json or ``` wrappers
    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // extract clean JSON array
    const match = aiText.match(/\[[\s\S]*?\]/);
    if (!match) {
      throw new Error("No JSON array found in AI output");
    }

    const suggestions = JSON.parse(match[0]);
    // -------------------------------------

    res.json({ suggestions });

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "AI recommendation failed" });
  }
};

module.exports = { getRecommendations };
