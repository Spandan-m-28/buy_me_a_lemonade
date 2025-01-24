"use client";

import React, { useState } from "react";

const Page = () => {
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

    const remainingData = {
      profilePic: formData.profilePic,
      coverPic: formData.coverPic,
      razorpayId: formData.razorpayId,
      razorpaySecret: formData.razorpaySecret,
      name: formData.name,
      username: formData.username,
    };

    console.log("Data to send:", {
      email: formData.email,
      dataToUpdate: remainingData,
    });

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

        setFormData({
          name: "",
          email: "",
          username: "",
          profilePic: "",
          coverPic: "",
          razorpayId: "",
          razorpaySecret: "",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update user.");
        console.error("Failed to update user:", errorData);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-white">
      <div className="w-[30vw] h-screen bg-white flex justify-center items-center">
        <img src="/lemonade_logo.svg" width={400} height={400} alt="Logo" />
      </div>
      <div className="w-[70vw] h-screen rounded-l-[100px] bg-[#faf8f0] flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-6">Enter your details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              required="true"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              required="true"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg">
              Username
            </label>
            <input
              required="true"
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="profilePic" className="text-lg">
              Profile pic
            </label>
            <input
              required="true"
              type="text"
              id="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              placeholder="Enter link for your profile pic"
              className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="coverPic" className="text-lg">
              Cover pic
            </label>
            <input
              required="true"
              type="text"
              id="coverPic"
              value={formData.coverPic}
              onChange={handleChange}
              placeholder="Enter link for your cover pic"
              className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="razorpayId" className="text-lg">
              Razorpay Id
            </label>
            <input
              required="true"
              type="text"
              id="razorpayId"
              value={formData.razorpayId}
              onChange={handleChange}
              placeholder="Enter Razorpay Id"
              className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="razorpaySecret" className="text-lg">
              Razorpay Secret
            </label>
            <input
              required="true"
              type="text"
              id="razorpaySecret"
              value={formData.razorpaySecret}
              onChange={handleChange}
              placeholder="Enter Razorpay secret"
              className="w-[600px] h-10 rounded-full px-6 bg-[#f0f0f0] placeholder:text-slate-600 hover:scale-105 cursor-pointer hover:ease-out duration-300"
            />
          </div>
          <button
            type="submit"
            className="bg-[#ffdd00] w-[400px] h-12 rounded-full text-xl font-medium hover:scale-110 hover:ease-out duration-300 mt-6"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
