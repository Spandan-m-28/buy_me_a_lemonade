import dbConnect from "./ConnectDB";
import Payment from "@/models/payment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      await dbConnect();

      // Extract 'to_user' from the query parameters
      const { to_user } = req.query;

      if (!to_user) {
        return res.status(400).json({ error: "Missing 'to_user' parameter." });
      }

      // Fetch payments with `to_user` matching
      const payments = await Payment.find({ to_user });

      // If no payments are found
      if (payments.length === 0) {
        return res.status(404).json({ error: "No payments found for this user." });
      }

      // Return the payments
      return res.status(200).json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error.message);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    // Unsupported HTTP method
    return res.status(405).json({ error: "Method not allowed." });
  }
}
