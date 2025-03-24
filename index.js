import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/ask-gpt", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({
      error: "Failed to call OpenAI API",
      detail: error?.response?.data,
    });
  }
});

app.listen(3000, () => console.log("GPT API server running on port 3000"));
