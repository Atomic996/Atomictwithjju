export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(404).end();

  const { message, history = [] } = req.body;
  const messages = [...history, { role: "user", content: message }];

  const API_KEY = process.env.API_KEY || "sk-wTNc5rFyLDbGBT6VNPP4LUE9VTuFeL0AXJXiXbovjFT0Fze4";

  const response = await fetch("https://api.bluesminds.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY,
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      messages,
    }),
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
