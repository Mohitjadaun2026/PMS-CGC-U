import { useParams, useNavigate } from "react-router-dom";

const alumniData = [
  { 
    id: 1, 
    name: "Arjun Sharma", 
    company: "Google", 
    package: "₹45 LPA", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2022, 
    department: "CSE", 
    role: "Software Engineer", 
    achievements: "Built large-scale distributed systems at Google", 
    linkedin: "https://linkedin.com/in/arjun" 
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    company: "Microsoft", 
    package: "₹42 LPA", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces", 
    graduationYear: 2021, 
    department: "IT", 
    role: "Product Manager", 
    achievements: "Led multiple product launches in Azure division", 
    linkedin: "https://linkedin.com/in/priya" 
  },
  { 
    id: 3, 
    name: "Ravi Kumar", 
    company: "Amazon", 
    package: "₹40 LPA", 
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2020, 
    department: "ECE", 
    role: "Solutions Architect", 
    achievements: "Optimized AWS cloud solutions for Fortune 500 clients", 
    linkedin: "https://linkedin.com/in/ravi" 
  },
  { 
    id: 4, 
    name: "Neha Gupta", 
    company: "Meta", 
    package: "₹55 LPA", 
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2019, 
    department: "CSE", 
    role: "AI Research Scientist", 
    achievements: "Published research papers in deep learning and NLP", 
    linkedin: "https://linkedin.com/in/neha" 
  },
  { 
    id: 5, 
    name: "Aditya Verma", 
    company: "Tesla", 
    package: "₹48 LPA", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2021, 
    department: "Mechanical", 
    role: "Autonomous Systems Engineer", 
    achievements: "Worked on autopilot features for Tesla cars", 
    linkedin: "https://linkedin.com/in/aditya" 
  },
  { 
    id: 6, 
    name: "Sanya Mehra", 
    company: "Apple", 
    package: "₹50 LPA", 
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2018, 
    department: "IT", 
    role: "UI/UX Designer", 
    achievements: "Designed key features for iOS applications", 
    linkedin: "https://linkedin.com/in/sanya" 
  },
  { 
    id: 7, 
    name: "Vikram Singh", 
    company: "Netflix", 
    package: "₹46 LPA", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2022, 
    department: "CSE", 
    role: "Backend Engineer", 
    achievements: "Developed scalable streaming infrastructure", 
    linkedin: "https://linkedin.com/in/vikram" 
  },
  { 
    id: 8, 
    name: "Anjali Nair", 
    company: "Adobe", 
    package: "₹38 LPA", 
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2020, 
    department: "CSE", 
    role: "Software Engineer II", 
    achievements: "Improved performance of Adobe Creative Cloud apps", 
    linkedin: "https://linkedin.com/in/anjali" 
  },
  { 
    id: 9, 
    name: "Karan Malhotra", 
    company: "Flipkart", 
    package: "₹35 LPA", 
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2021, 
    department: "IT", 
    role: "Data Scientist", 
    achievements: "Built recommendation systems for Flipkart shoppers", 
    linkedin: "https://linkedin.com/in/karan" 
  },
  { 
    id: 10, 
    name: "Meera Iyer", 
    company: "LinkedIn", 
    package: "₹44 LPA", 
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop&crop=face", 
    graduationYear: 2019, 
    department: "CSE", 
    role: "Full Stack Developer", 
    achievements: "Contributed to LinkedIn Learning platform", 
    linkedin: "https://linkedin.com/in/meera" 
  }
];



function AlumniDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const alumni = alumniData.find((a) => a.id === Number(id));

  if (!alumni) {
    return <div className="p-6">Alumni not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={alumni.image}
            alt={alumni.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{alumni.name}</h1>
            <p className="text-lg mt-2">{alumni.role} @ {alumni.company}</p>
            <p className="mt-1 text-blue-100 font-medium">{alumni.package}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-5 py-2 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100"
            >
              ← Back to Alumni
            </button>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Info</h2>
            <p><span className="font-medium">Graduation Year:</span> {alumni.graduationYear}</p>
            <p><span className="font-medium">Department:</span> {alumni.department}</p>
            <p><span className="font-medium">Current Role:</span> {alumni.role}</p>
            <p><span className="font-medium">Company:</span> {alumni.company}</p>
            <p><span className="font-medium">Package:</span> {alumni.package}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Achievements</h2>
            <p className="text-gray-700">{alumni.achievements}</p>
            <a
              href={alumni.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniDetail;
