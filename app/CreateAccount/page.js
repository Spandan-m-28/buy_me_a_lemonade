"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Navbar from "./Navbar";

const Page = () => {
  const router = useRouter(); // Initialize router
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    profilePic: "",
    coverPic: "",
    razorpayId: "",
    razorpaySecret: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const remainingData = {
      profilePic: formData.profilePic,
      coverPic: formData.coverPic,
      razorpayId: formData.razorpayId,
      razorpaySecret: formData.razorpaySecret,
      name: formData.name,
      username: formData.username,
    };

    try {
      const response = await fetch("/api/db/createAccount", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          dataToUpdate: remainingData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("User updated successfully!");
        console.log("User updated successfully:", result.data);

        

        // Redirect to the dashboard after successful account creation
        router.push(`/${formData.username}`); // Update this path as per your app's routing
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update user.");
        console.error("Failed to update user:", errorData);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar username={formData.username} />
      <div className="h-[100%] md:h-[50vh] w-screen flex bg-white">
        <span className="hidden md:block">
          <div className="w-[30vw] h-[91vh] bg-white flex justify-center items-center">
            <img src="/lemonade_logo.svg" width={400} height={400} alt="Logo" />
          </div>
        </span>
        <div className="w-[100%] md:w-[70vw] h-[100%] md:h-[91vh] md:rounded-l-[100px] bg-[#faf8f0] flex flex-col justify-center items-center">
          <h2 className="text-3xl mt-16 my-6">Enter your details</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {[
              "name",
              "email",
              "username",
              "profilePic",
              "coverPic",
              "razorpayId",
              "razorpaySecret",
            ].map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label htmlFor={field} className="text-lg capitalize">
                  {field === "razorpayId"
                    ? "Razorpay ID"
                    : field === "razorpaySecret"
                    ? "Razorpay Secret"
                    : field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  required
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="mx-auto w-[100%] md:w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
                  aria-label={`Enter your ${field}`}
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-[#ffdd00] w-[90%] md:w-[400px] mx-auto h-12 rounded-full text-xl font-medium ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110 hover:ease-out duration-300"
              } mt-6`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
          <div className="mt-4">
            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
