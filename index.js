import express from "express";
import axios from "axios";
const VALID_TOKEN = "gpt-secret-12345";
const app = express();
app.use(express.json());
//console.log("🔐 OPENAI_API_KEY =", process.env.OPENAI_API_KEY);
const API_KEY = process.env.OPENAI_API_KEY;
app.use((req, res, next) => {
  console.log("🔹 Incoming request:", req.method, req.url);
  next();
});

// Route gốc
app.post("/9810132973210311111110032103121115/ask-gpt", async (req, res) => {
  const { prompt, token } = req.body;

  // Kiểm tra token
  if (token !== VALID_TOKEN) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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

app.listen(3005, () => console.log("✅ GPT API server running on port 3000"));
