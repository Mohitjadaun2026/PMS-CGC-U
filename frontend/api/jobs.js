import mongoose from 'mongoose';
import Job from '../../backend/models/Job'; // Adjust path if needed

export default async function handler(req, res) {
  await mongoose.connect(process.env.MONGODB_URI);

  if (req.method === 'GET') {
    const jobs = await Job.find();
    return res.status(200).json(jobs);
  }

  // Add POST, PUT, DELETE logic as needed
  res.status(405).json({ message: 'Method Not Allowed' });
}
