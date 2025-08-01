export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    console.log("Received VP Token Response:", JSON.stringify(body, null, 2));

    // You could verify VP token here or store it
    res.status(200).json({ status: "success" });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
