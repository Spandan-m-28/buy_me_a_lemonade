import dbConnect from "./ConnectDB";
import User from "@/models/user";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await dbConnect();

      // Get user ID from Clerk
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated." });
      }

      // Fetch user details from Clerk API
      const clerkResponse = await fetch(
        `https://api.clerk.dev/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        }
      );

      const clerkData = await clerkResponse.json();

      if (!clerkResponse.ok) {
        console.error("Failed to fetch user from Clerk:", clerkData);
        return res
          .status(500)
          .json({ error: "Failed to fetch user details from Clerk." });
      }

      // Extract email from Clerk data
      const email = clerkData?.email_addresses?.[0]?.email_address;
      if (!email) {
        return res
          .status(400)
          .json({ error: "No email address found for the user." });
      }

      // Extract username from request body
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: "Username is required in the request body." });
      }

      // Find user in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found in the database." });
      }

      // Return user details (omit sensitive fields)
      const { password, ...userDetails } = user.toObject();
      return res.status(200).json(userDetails);
    } catch (error) {
      console.error("Error in handler:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ error: "Method not allowed." });
  }
}
