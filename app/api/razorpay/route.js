import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment";
import dbConnect from "@/pages/api/db/ConnectDB";

export const POST = async (req) => {
  await dbConnect();

  let body = await req.formData();
  body = Object.fromEntries(body);

  const paymentRecord = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!paymentRecord) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }

  const isValid = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    process.env.KEY_SECRET
  );

  if (isValid) {
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );

    if (!updatedPayment) {
      return NextResponse.json({ success: false, message: "Payment update failed" });
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`;
    return NextResponse.redirect(redirectUrl);
  } else {
    return NextResponse.json({ success: false, message: "Payment verification failed" });
  }
};
