import dbConnect from './ConnectDB';
import User from '@/models/user';

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === 'PUT') {
    const { email, dataToUpdate } = req.body;

    try {
      // Ensure that the username is unique
      if (dataToUpdate.username) {
        const usernameExists = await User.findOne({
          username: dataToUpdate.username,
          email: { $ne: email }, // Ensure it's not the current user
        });

        if (usernameExists) {
          return res.status(400).json({
            success: false,
            message: 'Username already exists. Please choose a different username.',
          });
        }
      }

      // Check if the user exists by email
      let user = await User.findOne({ email });

      if (!user) {
        // If the user doesn't exist, create a new user
        user = new User({ email, ...dataToUpdate });
        await user.save();

        return res.status(201).json({
          success: true,
          message: 'User created successfully.',
          data: user,
        });
      }

      // Update user data if the user exists
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: dataToUpdate },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        data: updatedUser,
      });
    } catch (error) {
      // Handle duplicate key error for unique constraints
      if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists. Please choose a different username.',
        });
      }

      console.error('Error handling user data:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
};

export default handler;
