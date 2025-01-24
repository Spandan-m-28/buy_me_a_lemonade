"use client";
import React from "react";
import Navbar from "../AboutUs/Navbar";
import Footer from "./Footer";
import Script from "next/script";
import { useState } from "react";

const page = () => {
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const handlechange = (e) => {
    console.log(e.target.value);
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    console.log(paymentform);
    try {
      // Call the server-side API to create a payment
      const response = await fetch("/api/db/initiatePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          to_username: "Spandan", // Replace with the actual username
          paymentform,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      // Initialize Razorpay checkout
      const { order } = data;

      var options = {
        key: process.env.NEXT_PUBLIC_KEY_ID, // Use NEXT_PUBLIC for client-side environment variables
        amount: order.amount,
        currency: order.currency,
        name: "Buy Me a Lemonade",
        description: "Support your favorite creator",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: "https://localhost:3000/api/razorpay",
        prefill: {
          name: paymentform.name,
          email: "example@example.com", // Replace with actual email
          contact: "9000090000", // Replace with actual contact number
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <Navbar />
      <div>
        <div className="cover w-full bg-red-50 relative">
          <img
            className="object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm"
            src={
              "https://cdn.buymeacoffee.com/uploads/cover_images/2021/12/4c322b36c4d6db40064d13dd4c305d6f.png@2560w_0e.webp"
            }
            alt=""
          />
          <div className="absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36">
            <img
              className="rounded-full object-cover size-36"
              width={400}
              height={400}
              src={
                "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              }
              alt=""
            />
          </div>
        </div>
        <div className="mt-24 min-w-[100%] mx-auto">
          <p className="text-center text-2xl">Username</p>
        </div>
        <div className="w-[70%] mx-auto flex gap-4 mt-10">
          <div className="leaderboard w-[50%] bg-[#faf8f0] rounded-3xl drop-shadow-2xl p-3">
            <div className="text-2xl ml-6 mt-5">Your Suppoters</div>
            <div className="flex justify-center items-center ">
              {/* display Suppoters */}
              <div className="suppoter cursor-pointer w-96 bg-white rounded-lg flex justify-center gap-10 items-center mt-5">
                <span>
                  <lord-icon
                    src={"https://cdn.lordicon.com/kdduutaw.json"}
                    trigger="hover"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </span>
                <div className="text-lg">@Username gave you 2 Lemonades</div>
              </div>
            </div>
          </div>
          <div className="payment rounded-3xl w-[50%] bg-[#faf8f0] drop-shadow-2xl p-3">
            <div className="text-center mt-3 text-xl mb-3">Support Me</div>
            <div>
              <div className="flex flex-col gap-4">
                <input
                  onChange={handlechange}
                  value={paymentform.name}
                  name="name"
                  className="w-80 h-10 mx-auto mt-3 rounded-lg px-4 cursor-pointer"
                  type="text"
                  placeholder="Enter name"
                />
                <input
                  onChange={handlechange}
                  value={paymentform.message}
                  name="message"
                  className="w-80 h-10 mx-auto mt-3 rounded-lg px-4 cursor-pointer"
                  type="text"
                  placeholder="Enter message"
                />
                <input
                  onChange={handlechange}
                  value={paymentform.amount}
                  name="amount"
                  className="w-80 h-10 mx-auto mt-3 rounded-lg px-4 cursor-pointer"
                  type="text"
                  placeholder="Enter amount"
                />

                <button className="bg-[#ffdd00] w-56 mx-auto p-3 text-xl rounded-full mt-3 hover:scale-105 ease-out duration-300 active:cursor-wait">
                  Pay
                </button>
              </div>
              <div className="w-[80%] mx-auto h-[1px] my-4 bg-slate-800"></div>
              <div className="flex flex-col gap-6 mb-5 ">
                <button
                  onClick={() => {
                    pay(10);
                  }}
                  className="bg-[#ffdd00] hover:scale-105 ease-out duration-300 w-[30%] mx-auto p-3 rounded-lg active:cursor-wait"
                >
                  Pay ₹10
                </button>
                <button
                  onClick={() => {
                    pay(20);
                  }}
                  className="bg-[#ffdd00] hover:scale-105 ease-out duration-300 w-[30%] mx-auto p-3 rounded-lg active:cursor-wait"
                >
                  Pay ₹20
                </button>
                <button
                  onClick={() => {
                    pay(30);
                  }}
                  className="bg-[#ffdd00] hover:scale-105 ease-out duration-300 w-[30%] mx-auto p-3 rounded-lg active:cursor-wait"
                >
                  Pay ₹30
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
