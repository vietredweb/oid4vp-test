export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change '*' to a specific domain if needed
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const response = await fetch(
      "https://digital-credentials.dev/api/validateResponse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add additional headers if required
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res
      .status(500)
      .json({ error: "Proxy request failed", details: error.message });
  }
}
