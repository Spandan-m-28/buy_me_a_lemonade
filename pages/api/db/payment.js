"use server";

import Razorpay from "razorpay";
import Payment from "@/models/payment";
import dbConnect from "./ConnectDB";

export const initiatePayment = async (amount, to_username, paymentform) => {
  try {
    // Connect to the database
    await dbConnect();

    // Log the input data for debugging
    console.log("Initiating payment with the following details:");
    console.log("Amount:", amount);
    console.log("To Username:", to_username);
    console.log("Payment Form:", paymentform);

    // Validate the required fields
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error("Invalid payment amount");
    }
    if (!to_username) {
      throw new Error("Recipient username is required");
    }
    if (!paymentform || !paymentform.name || !paymentform.message) {
      throw new Error("Payment form details are incomplete");
    }

    // Create a Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    // Log Razorpay keys to ensure they're loaded
    console.log("Razorpay Key ID:", process.env.KEY_ID);
    console.log("Razorpay Key Secret is loaded:", !!process.env.KEY_SECRET);

    // Create a new Razorpay order
    const options = {
      amount: Number.parseInt(amount) * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
    };

    console.log("Creating Razorpay order with options:", options);

    const order = await instance.orders.create(options);

    console.log("Razorpay order created successfully:", order);

    // Save the payment details to the database
    const payment = await Payment.create({
      oid: order.id,
      amount: amount,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message,
    });

    console.log("Payment details saved to database:", payment);

    // Return the Razorpay order details
    return { success: true, order };
  } catch (error) {
    console.error("Error during payment initiation:", error.message, error.stack);
    return { success: false, error: error.message || "Failed to initiate payment" };
  }
};
