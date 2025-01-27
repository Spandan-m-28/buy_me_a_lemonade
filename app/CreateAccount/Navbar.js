"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

const Navbar = () => {
  const router = useRouter(); // Initialize useRouter for navigation

  const forward = async () => {
    try {
      const response = await fetch("/api/db/forwardToDashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to the dashboard using the username from the API
        if (data.username) {
          router.push(`/${data.username}`); // Directly redirect to the username route
        } else {
          console.error("No username found in the response.");
        }
      } else {
        console.error("Failed to fetch dashboard information");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="flex justify-end h-20 bg-[#faf8f0] z-10">
      <button
        onClick={forward}
        className="bg-[#ffdd00] mr-10 flex items-center justify-center rounded-full text-xl py-3 px-7 mt-3 font-medium hover:scale-110 hover:ease-out duration-300"
      >
        Dashboard&rarr;
      </button>
    </div>
  );
};

export default Navbar;
