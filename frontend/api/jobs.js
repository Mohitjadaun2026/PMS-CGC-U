
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const jobSchema = new mongoose.Schema({
  companyName: String,
  companyLogo: String,
  companyWebsite: String,
  position: String,
  jobType: String,
  salaryPackage: String,
  location: String,
  applicationDeadline: String,
  jobDescription: String,
  skillsRequired: String,
  selectionProcess: String,
  bondDetails: String,
  benefits: String,
  contactPerson: String,
  contactEmail: String,
  contactPhone: String,
  driveDate: String,
  additionalInfo: String,
  eligibleCourses: [String],
  eligibleYears: [String],
  eligibleBranches: [String],
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'GET') {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } else if (req.method === 'POST') {
    try {
      const job = new Job(req.body);
      await job.save();
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
