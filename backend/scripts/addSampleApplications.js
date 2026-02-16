// Script to add sample applications to PMS-CGC-U database
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Application = require('../models/Application');
const Job = require('../models/Job');

dotenv.config();

const MONGODB_URI = 'mongodb+srv://jadaunmohit0:Mohit%40123@pms-cgcu.gkrai7w.mongodb.net/PMS-CGC-U?retryWrites=true&w=majority';

async function addSampleApplications() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Fetch jobs to associate applications
    const jobs = await Job.find({});
    if (jobs.length === 0) {
      console.log('No jobs found. Please add jobs first.');
      process.exit(0);
    }

    // Sample applications
    const applications = [
      {
        job: jobs[0]._id,
        applicantName: 'Amit Sharma',
        applicantEmail: 'amit.sharma@example.com',
        applicantPhone: '9876543210',
        applicantCourse: 'B.Tech',
        applicantYear: '2025',
        applicantBranch: 'CSE',
        status: 'pending',
        appliedAt: new Date(),
        formResponses: [
          { fieldLabel: 'Resume Link', response: 'https://drive.google.com/amit_resume', fieldType: 'text' },
          { fieldLabel: 'Skills', response: 'React, Node.js, MongoDB', fieldType: 'text' }
        ]
      },
      {
        job: jobs[1]?._id || jobs[0]._id,
        applicantName: 'Priya Verma',
        applicantEmail: 'priya.verma@example.com',
        applicantPhone: '9123456789',
        applicantCourse: 'MBA',
        applicantYear: '2024',
        applicantBranch: 'Management',
        status: 'shortlisted',
        appliedAt: new Date(),
        formResponses: [
          { fieldLabel: 'Resume Link', response: 'https://drive.google.com/priya_resume', fieldType: 'text' },
          { fieldLabel: 'Skills', response: 'Marketing, Communication', fieldType: 'text' }
        ]
      }
    ];

  await Application.create(applications);
    console.log('Sample applications added successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error adding applications:', err);
    process.exit(1);
  }
}

addSampleApplications();
