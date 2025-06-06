export const students = [
  {
    id: 1,
    name: "Maria Rodriguez",
    photo: "/images/maria-rodriguez.png",
    university: "MIT",
    program: "Computer Science",
    degree: "Master's Degree",
    goal: 50000,
    funded: 32000,
    location: "Boston, MA",
    tags: ["STEM", "AI/ML", "Healthcare"],
    statement: "I am passionate about using artificial intelligence to solve healthcare challenges in underserved communities. My research focuses on developing AI-powered diagnostic tools that can be deployed in resource-limited settings.",
    documents: [
      { name: "Enrollment Verification", type: "PDF", verified: true },
      { name: "Academic Transcript", type: "PDF", verified: true },
      { name: "Research Proposal", type: "PDF", verified: false },
    ],
    milestones: [
      { title: "Semester 1 Tuition", amount: 15000, completed: true },
      { title: "Research Equipment", amount: 8000, completed: true },
      { title: "Semester 2 Tuition", amount: 15000, completed: false },
      { title: "Conference & Travel", amount: 5000, completed: false },
      { title: "Thesis Research", amount: 7000, completed: false },
    ],
    updates: [
      {
        date: "2024-01-15",
        title: "Research Progress Update",
        content: "Successfully completed the first phase of my AI diagnostic tool. The preliminary results show 94% accuracy in detecting early-stage conditions.",
      },
      {
        date: "2024-01-01",
        title: "Semester 1 Complete",
        content: "Thanks to your support, I've successfully completed my first semester with a 3.9 GPA.",
      },
    ],
  },
  {
    id: 2,
    name: "James Chen",
    photo: "/images/jameschen.jpg",
    university: "Stanford University",
    program: "Biomedical Engineering",
    degree: "PhD",
    goal: 75000,
    funded: 45000,
    location: "Palo Alto, CA",
    tags: ["STEM", "Medical", "Biotech"],
    statement: "Developing innovative low-cost medical devices for developing countries. My research focuses on creating affordable prosthetics using 3D printing technology.",
    documents: [
      { name: "Enrollment Verification", type: "PDF", verified: true },
      { name: "Academic Transcript", type: "PDF", verified: true },
      { name: "Research Plan", type: "PDF", verified: true },
    ],
    milestones: [
      { title: "Lab Equipment", amount: 25000, completed: true },
      { title: "Year 1 Tuition", amount: 20000, completed: true },
      { title: "Research Materials", amount: 15000, completed: false },
      { title: "Conference Presentations", amount: 15000, completed: false },
    ],
    updates: [
      {
        date: "2024-02-01",
        title: "Published Research Paper",
        content: "Our team's research on 3D-printed prosthetics was published in a leading medical journal.",
      },
      {
        date: "2024-01-15",
        title: "Prototype Success",
        content: "Successfully tested our first prototype with three patients. Results are promising.",
      },
    ],
  },
  {
  id: 3,
  name: "David Kim",
  photo: "/images/davidkim.jpeg",
  university: "UC Berkeley",
  program: "Environmental Science",
  degree: "Bachelor's Degree",
  goal: 40000,
  funded: 15000,
  location: "Berkeley, CA",
  tags: ["Environmental", "Research"],
  statement: "Working on sustainable energy solutions for rural communities.",
  documents: [
    { name: "Enrollment Verification", type: "PDF", verified: true },
    { name: "Transcript", type: "PDF", verified: true },
    { name: "Recommendation Letter", type: "PDF", verified: false },
  ],
  milestones: [
    { title: "Semester 1 Tuition", amount: 10000, completed: true },
    { title: "Field Research Setup", amount: 8000, completed: true },
    { title: "Semester 2 Tuition", amount: 12000, completed: false },
    { title: "Capstone Project", amount: 10000, completed: false },
  ],
  updates: [
    {
      date: "2024-02-01",
      title: "Field Project Launched",
      content: "Initiated renewable energy pilot in a rural village. Results expected in Q3.",
    },
  ],
},
{
  id: 4,
  name: "Sarah Johnson",
  photo: "/images/sarahjohnson.jpg",
  university: "Yale University",
  program: "Public Health",
  degree: "Master's Degree",
  goal: 60000,
  funded: 42000,
  location: "New Haven, CT",
  tags: ["Public Health", "Policy"],
  statement: "Focusing on health policy reform and community health initiatives.",
  documents: [
    { name: "Enrollment Verification", type: "PDF", verified: true },
    { name: "Academic Transcript", type: "PDF", verified: true },
    { name: "Policy Thesis Draft", type: "PDF", verified: false },
  ],
  milestones: [
    { title: "Semester Tuition", amount: 25000, completed: true },
    { title: "Community Research", amount: 10000, completed: true },
    { title: "Internship Travel", amount: 10000, completed: false },
    { title: "Capstone Submission", amount: 15000, completed: false },
  ],
  updates: [
    {
      date: "2024-03-12",
      title: "Community Survey Completed",
      content: "Completed a 500-person survey on access to healthcare across 3 cities.",
    },
  ],
},
{
  id: 5,
  name: "Ahmed Hassan",
  photo: "/images/ahmadhassan.webp",
  university: "Carnegie Mellon",
  program: "Robotics",
  degree: "PhD",
  goal: 55000,
  funded: 28000,
  location: "Pittsburgh, PA",
  tags: ["STEM", "Robotics"],
  statement: "Building assistive robotics for people with disabilities.",
  documents: [
    { name: "PhD Enrollment Letter", type: "PDF", verified: true },
    { name: "Previous Work Samples", type: "PDF", verified: true },
    { name: "Research Ethics Approval", type: "PDF", verified: false },
  ],
  milestones: [
    { title: "Semester Tuition", amount: 20000, completed: true },
    { title: "Prototype Components", amount: 10000, completed: true },
    { title: "Field Testing Phase", amount: 15000, completed: false },
    { title: "Conference Presentation", amount: 10000, completed: false },
  ],
  updates: [
    {
      date: "2024-02-15",
      title: "Prototype Completed",
      content: "Created a working prototype of assistive robotic arm with voice control.",
    },
  ],
},
{
  id: 6,
  name: "Aisha Patel",
  photo: "/images/aishapatel.jpg",
  university: "Harvard Medical School",
  program: "Medicine",
  degree: "MD",
  goal: 100000,
  funded: 78000,
  location: "Boston, MA",
  tags: ["Medical", "Research"],
  statement: "Researching innovative treatments for rare genetic diseases.",
  documents: [
    { name: "Enrollment Certificate", type: "PDF", verified: true },
    { name: "Medical Transcripts", type: "PDF", verified: true },
    { name: "Clinical Trial Proposal", type: "PDF", verified: false },
  ],
  milestones: [
    { title: "Year 1 Tuition", amount: 30000, completed: true },
    { title: "Lab Supplies", amount: 10000, completed: true },
    { title: "Clinical Research", amount: 30000, completed: true },
    { title: "Final Year Tuition", amount: 30000, completed: false },
  ],
  updates: [
    {
      date: "2024-04-01",
      title: "Trial Preparation Underway",
      content: "Ethics committee approved initial study on gene editing methodology.",
    },
  ],
}

]

export function getStudentById(id: number) {
  return students.find(student => student.id === id) || null
}