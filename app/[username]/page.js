"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Script from "next/script";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import NotFound from "../404";

const page = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const [user, setuser] = useState({});
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/db/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: params.username,
        }),
      });
      if (response.status === 404) {
        notFound(); // Automatically stops rendering
        return;
      }

      const data = await response.json(); // Parse JSON here
      setuser(data);
    };
    fetchData();

    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `/api/db/getPayments?to_user=${params.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPayments(data); // Save resolved data to state
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const handlechange = (e) => {
    console.log(e.target.value);
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    try {
      const response = await fetch("/api/db/initiatePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          to_username: params.username, // Dynamically set the recipient username
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
        callback_url: "/api/razorpay", // Correct callback URL
        prefill: {
          name: paymentform.name,
          email: "meshramspandan3@gmail.com",
          contact: "7249423213",
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
            src={user.coverPic}
            alt=""
          />
          <div className="absolute -bottom-20 right-[30%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36">
            <img
              className="rounded-full object-cover size-36"
              width={400}
              height={400}
              src={user.profilePic}
              alt=""
            />
          </div>
        </div>
        <div className="mt-24 min-w-[100%] mx-auto">
          <p className="text-center text-2xl">{params.username}</p>
        </div>
        <div className="w-[90%] md:w-[70%] mx-auto flex flex-wrap  gap-4 mt-10">
          <div className=" mx-auto leaderboard w-[90%] md:w-[49%] bg-[#faf8f0] rounded-3xl drop-shadow-2xl p-3">
            <div className="text-2xl ml-6 mt-5">Your Suppoters</div>
            <div className="flex flex-col overflow-scroll justify-center items-center ">
              {payments
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 10)
                .map((payment, index) => (
                  <div
                    key={index}
                    className="suppoter cursor-pointer w-96 bg-white rounded-lg flex justify-center gap-10 items-center mt-5"
                  >
                    <div className="text-lg">{`${payment.name} Gave you ${payment.amount} and said "${payment.message}"`}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="payment rounded-3xl w-[90%] mx-auto md:w-[49%] bg-[#faf8f0] drop-shadow-2xl p-3">
            <div className="text-center mt-3 text-xl mb-3">Support Me</div>
            <div>
              <div className="flex flex-col gap-4">
                <input
                  onChange={handlechange}
                  value={paymentform.name}
                  name="name"
                  className="md:w-80 h-10 mx-auto mt-3 rounded-lg px-4 cursor-pointer"
                  type="text"
                  placeholder="Enter name"
                />
                <input
                  onChange={handlechange}
                  value={paymentform.message}
                  name="message"
                  className="md:w-80 h-10 mx-auto mt-3 rounded-lg px-4 cursor-pointer"
                  type="text"
                  placeholder="Enter message"
                />
                <input
                  onChange={handlechange}
                  value={paymentform.amount}
                  name="amount"
                  className="md:w-80 h-10 mx-auto mt-3 rounded-lg px-4 cursor-pointer"
                  type="text"
                  placeholder="Enter amount"
                />

                <button
                  onClick={() => {
                    pay(paymentform.amount);
                  }}
                  className="bg-[#ffdd00] w-56 mx-auto p-3 text-xl rounded-full mt-3 hover:scale-105 ease-out duration-300 active:cursor-wait"
                >
                  Pay
                </button>
              </div>
              <div className="w-[80%] mx-auto h-[1px] my-4 bg-slate-800"></div>
              <div className="flex flex-col gap-6 mb-5 ">
                <button
                  onClick={() => {
                    pay(10);
                  }}
                  className="bg-[#ffdd00] hover:scale-105 ease-out duration-300 w-[50%] md:w-[30%] mx-auto p-3 rounded-lg active:cursor-wait"
                >
                  Pay ₹10
                </button>
                <button
                  onClick={() => {
                    pay(20);
                  }}
                  className="bg-[#ffdd00] hover:scale-105 ease-out duration-300 w-[50%] md:w-[30%] mx-auto p-3 rounded-lg active:cursor-wait"
                >
                  Pay ₹20
                </button>
                <button
                  onClick={() => {
                    pay(30);
                  }}
                  className="bg-[#ffdd00] hover:scale-105 ease-out duration-300 w-[50%] md:w-[30%] mx-auto p-3 rounded-lg active:cursor-wait"
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
