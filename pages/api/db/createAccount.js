import dbConnect from './ConnectDB';
import User from '@/models/user'; 

const handler = async (req, res) => {
  await dbConnect(); 

  if (req.method === 'PUT') {
    const { email, dataToUpdate } = req.body;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { email }, 
        { $set: dataToUpdate }, 
        { new: true, runValidators: true } 
      );

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      res.status(200).json({ success: true, message: 'User updated successfully.', data: updatedUser }); 

    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'An error occurred while updating the user.', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;