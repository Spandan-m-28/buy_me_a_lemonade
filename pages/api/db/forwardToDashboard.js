import dbConnect from "./ConnectDB";
import userModel from "@/models/user";
import { getAuth } from "@clerk/nextjs/server"; // For session handling

const forwardToDashboard = async (req, res) => {
  try {
    // Connect to the database
    await dbConnect();

    // Get the session from Clerk
    const { userId } = getAuth(req); // This extracts session info from the request headers
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    // Fetch user details from Clerk API
    const clerkResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!clerkResponse.ok) {
      return res.status(500).json({ error: "Failed to fetch user details from Clerk." });
    }

    const clerkData = await clerkResponse.json();

    // Extract the email from Clerk data
    const email = clerkData?.email_addresses?.[0]?.email_address;
    if (!email) {
      return res.status(400).json({ error: "No email address found for the user." });
    }

    // Find user in the database by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found in the database." });
    }

    // Redirect to the user's dashboard based on username
    const sanitizedUsername = encodeURIComponent(user.username);
    // Send the redirect URL back to the frontend
    res.status(200).json({ username: sanitizedUsername });

  } catch (error) {
    console.error("Error in handler:", error.message);
    res.status(500).json({ error: "Internal server error.", details: error.message });
  }
};

export default forwardToDashboard;
