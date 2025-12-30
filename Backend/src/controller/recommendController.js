const axios = require("axios");
require("dotenv").config();

const getRecommendations = async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "items must be an array" });
  }

  try {
    // ---------------- Step 1: First API call with reasoning ----------------
    const initialPrompt = `
      Based on this items list: ${items.join(", ")},
      suggest 5 additional shop items based on item list that people often forget.
      For each item, also give an estimated price in INR.
      Respond with a JSON array of objects:
      [
        { "name": "Milk", "estimated_price": 60 },
        ...
      ]
    `;

    let response1 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-30b-a3b:free", //NVIDIA: Nemotron 3 Nano 30B A3B (free)
        messages: [
          {
            role: "user",
            content: initialPrompt,
          },
        ],
        reasoning: { enabled: true }, // enable reasoning
      }),
    });

    const result1 = await response1.json();
    let assistantMessage = result1.choices[0].message;

    // ---------------- Step 2: Second API call to continue reasoning ----------------
    const messages = [
      {
        role: "user",
        content: initialPrompt,
      },
      {
        role: "assistant",
        content: assistantMessage.content,
        reasoning_details: assistantMessage.reasoning_details, // preserve reasoning
      },
      {
        role: "user",
        content: "Are you sure? Think carefully.",
      },
    ];

    let response2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-30b-a3b:free",
        messages: messages,
      }),
    });

    const result2 = await response2.json();
    let aiText = result2.choices[0].message.content;

    // ---------------- Fix AI output to valid JSON ----------------
    aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();

    const match = aiText.match(/\[[\s\S]*?\]/);
    if (!match) {
      throw new Error("No JSON array found in AI output");
    }

    const suggestions = JSON.parse(match[0]);

    res.json({ suggestions });

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "AI recommendation failed" });
  }
};

module.exports = { getRecommendations };
