const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('../models/Job');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/placement';

const jobs = [
  {
    position: 'Software Engineer',
    companyName: 'Google',
    location: 'Bangalore, India',
    jobDescription: 'Develop scalable web applications and services.',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    jobType: 'Full-time',
    salaryPackage: '30 LPA',
    applicationDeadline: '',
    eligibleCourses: ['BTech', 'MTech'],
    eligibleBranches: ['CSE', 'IT'],
    eligibleYears: ['2024', '2025'],
  },
  {
    position: 'Data Analyst',
    companyName: 'Microsoft',
    location: 'Hyderabad, India',
    jobDescription: 'Analyze data and generate business insights.',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    jobType: 'Full-time',
    salaryPackage: '25 LPA',
    applicationDeadline: '',
    eligibleCourses: ['BTech', 'BSc'],
    eligibleBranches: ['CSE', 'ECE'],
    eligibleYears: ['2024', '2025'],
  },
  {
    position: 'Backend Developer',
    companyName: 'Amazon',
    location: 'Remote',
    jobDescription: 'Build and maintain backend services for e-commerce.',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    jobType: 'Full-time',
    salaryPackage: '28 LPA',
    applicationDeadline: '',
    eligibleCourses: ['BTech', 'MCA'],
    eligibleBranches: ['CSE', 'IT'],
    eligibleYears: ['2024', '2025'],
  },
  {
    position: 'Frontend Developer',
    companyName: 'Flipkart',
    location: 'Bangalore, India',
    jobDescription: 'Create beautiful and responsive user interfaces.',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flipkart_logo.svg',
    jobType: 'Full-time',
    salaryPackage: '22 LPA',
    applicationDeadline: '',
    eligibleCourses: ['BTech', 'BSc'],
    eligibleBranches: ['CSE', 'IT'],
    eligibleYears: ['2024', '2025'],
  },
  {
    position: 'DevOps Engineer',
    companyName: 'Infosys',
    location: 'Pune, India',
    jobDescription: 'Automate deployment and manage cloud infrastructure.',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Infosys_logo.svg',
    jobType: 'Full-time',
    salaryPackage: '20 LPA',
    applicationDeadline: '',
    eligibleCourses: ['BTech', 'MTech'],
    eligibleBranches: ['CSE', 'ECE'],
    eligibleYears: ['2024', '2025'],
  },
  {
    position: 'Product Manager',
    companyName: 'TCS',
    location: 'Mumbai, India',
    jobDescription: 'Lead product development and strategy.',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_Consultancy_Services_Logo.svg',
    jobType: 'Full-time',
    salaryPackage: '35 LPA',
    applicationDeadline: '',
    eligibleCourses: ['MBA'],
    eligibleBranches: [],
    eligibleYears: ['2024', '2025'],
  },
];

async function addMultipleJobs() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'PMS-CGC-U',
      retryWrites: true,
      w: 'majority',
    });
    console.log('Connected to MongoDB');

    await Job.insertMany(jobs);
    console.log('Multiple jobs added successfully!');
  } catch (error) {
    console.error('Error adding jobs:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

addMultipleJobs();
