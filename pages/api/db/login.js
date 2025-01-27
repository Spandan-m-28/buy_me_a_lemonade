import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "./ConnectDB";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {

      // Connect to the database
      await dbConnect();

      // Get the userId from Clerk's authentication
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ error: "User not authenticated." });
      }

      // Fetch user details from Clerk
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
        return res.status(500).json({ error: "Failed to fetch user from Clerk." });
      }

      // Ensure the email_addresses array is present and has at least one email
      const emailAddresses = clerkData?.email_addresses;

      if (!emailAddresses || emailAddresses.length === 0) {
        return res.status(400).json({ error: "User email is missing." });
      }

      // Extract the email and name
      const email = emailAddresses[0]?.email_address; // Access the email correctly
      const name = `${clerkData.first_name || ""} ${clerkData.last_name || ""}`.trim();

      // Check if the user already exists in MongoDB
      let user = await User.findOne({ email });

      if (!user) {
        // If the user doesn't exist, create a new one
        user = new User({ email, name });
        await user.save();
        return res.status(201).json({ message: "User created", user });
      }

      return res.status(200).json({ message: "User already exists", user });
    } catch (error) {
      console.error("Error during login process:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: "Method not allowed" });
  }
}
