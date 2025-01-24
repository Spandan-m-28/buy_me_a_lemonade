"use server"
import { initiatePayment } from './payment';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, to_username, paymentform } = req.body;

      // Basic data validation
      if (!amount || !to_username || !paymentform) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const result = await initiatePayment(amount, to_username, paymentform);

      if (result.success) {
        res.status(200).json({ success: true, order: result.order });
      } else {
        // Log the error for debugging
        console.error('Payment initiation failed:', result.error);
        res.status(500).json({ success: false, error: result.error || 'Payment failed' }); 
      }

    } catch (error) {
      console.error('An unexpected error occurred:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
