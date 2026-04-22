import React, { createContext, useContext, useState } from "react";

const SubmissionContext = createContext();

export const submissionsData = [
  {
    id: "EVT-001",
    eventName: "Annual Tech Symposium 2024",
    dept: "Computer Science",
    hod: "Dr. Sarah Jenkins",
    hodEmail: "cs.hod@notivo.edu",
    hodPhone: "+91 98765 43210",
    submitted: "Oct 20, 2024",
    eventDate: "Oct 24, 2024",
    venue: "Main Auditorium, Block A",
    expectedAttendees: 450,
    status: "Pending Review",
    file: "Detailed_Invitation_Final.pdf",
    icon: "🎓",
    previewBg: "#1E3A5F",
    category: "Technical",
    description:
      "The Annual Tech Symposium 2024 is a flagship event organized by the Department of Computer Science to bring together students, faculty, and industry professionals. The event will feature keynote speeches from leading tech executives, panel discussions on emerging technologies including AI, Cloud Computing, and Cybersecurity, hands-on workshops, and a student project expo. Special guest lectures from alumni working at top MNCs are also planned.",
    agenda: [
      { time: "09:00 AM", activity: "Registration & Welcome" },
      { time: "10:00 AM", activity: "Keynote: Future of AI — Dr. Rajan Mehta" },
      { time: "11:30 AM", activity: "Panel Discussion: Tech Careers 2025" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "02:00 PM", activity: "Workshops (3 parallel tracks)" },
      { time: "04:30 PM", activity: "Student Project Expo" },
      { time: "06:00 PM", activity: "Prize Distribution & Closing" },
    ],
    budget: "₹1,20,000",
    sponsors: ["TCS", "Infosys", "Google India"],
    requirements: "Projector, PA system, 20 tables for expo, catering for 450 pax",
    attachments: ["Invitation_Poster.pdf", "Budget_Estimate.xlsx", "Guest_List.docx"],
    timeline: [
      { label: "Submitted for review", time: "Oct 20, 2024, 09:00 AM", color: "#9CA3AF" },
      { label: "Under admin review", time: "Today, 10:45 AM", color: "#2563EB" },
    ],
  },
  {
    id: "EVT-002",
    eventName: "AI & ML Workshop 2024",
    dept: "Electrical Engineering",
    hod: "Prof. David Miller",
    hodEmail: "ee.hod@notivo.edu",
    hodPhone: "+91 97654 32109",
    submitted: "Oct 19, 2024",
    eventDate: "Nov 05, 2024",
    venue: "Seminar Hall, Block C",
    expectedAttendees: 120,
    status: "Approved",
    file: "Workshop_Banner_v2.pdf",
    icon: "🤖",
    previewBg: "#064E3B",
    category: "Workshop",
    description:
      "A two-day intensive workshop on Artificial Intelligence and Machine Learning fundamentals and advanced topics. The workshop will cover Python for ML, Neural Networks, Computer Vision, NLP basics, and hands-on projects. Participants will receive certificates on completion. Industry mentors from leading AI companies will guide the sessions.",
    agenda: [
      { time: "Day 1 - 09:00 AM", activity: "Python & ML Fundamentals" },
      { time: "Day 1 - 02:00 PM", activity: "Neural Networks Hands-on" },
      { time: "Day 2 - 09:00 AM", activity: "Computer Vision & NLP" },
      { time: "Day 2 - 02:00 PM", activity: "Project Showcase" },
    ],
    budget: "₹45,000",
    sponsors: ["NVIDIA", "Microsoft Azure"],
    requirements: "30 laptops with GPU, high-speed internet, projector",
    attachments: ["Workshop_Brochure.pdf", "Trainer_Profile.pdf"],
    timeline: [
      { label: "Submitted for review", time: "Oct 19, 2024, 09:00 AM", color: "#9CA3AF" },
      { label: "Approved by admin", time: "Oct 22, 2024, 02:00 PM", color: "#10B981" },
    ],
  },
  {
    id: "EVT-003",
    eventName: "Cultural Fest 2024",
    dept: "Mechanical Engineering",
    hod: "Prof. James Okafor",
    hodEmail: "me.hod@notivo.edu",
    hodPhone: "+91 96543 21098",
    submitted: "Oct 18, 2024",
    eventDate: "Nov 15, 2024",
    venue: "Open Air Theatre & Sports Ground",
    expectedAttendees: 1200,
    status: "Rejected",
    file: "Cultural_Fest_Poster.pdf",
    icon: "🎭",
    previewBg: "#7C3AED",
    category: "Cultural",
    description:
      "The annual Cultural Fest is a celebration of art, music, dance, and drama. Events include classical dance performances, rock band competitions, street plays, art exhibitions, and food stalls representing different states of India. The fest is open to all students and their families.",
    agenda: [
      { time: "10:00 AM", activity: "Inauguration Ceremony" },
      { time: "11:00 AM", activity: "Classical Dance Performances" },
      { time: "01:00 PM", activity: "Lunch & Food Stalls" },
      { time: "03:00 PM", activity: "Rock Band Competition" },
      { time: "05:00 PM", activity: "Street Play & Drama" },
      { time: "07:00 PM", activity: "Grand Finale & Awards" },
    ],
    budget: "₹2,50,000",
    sponsors: ["Local Businesses", "Alumni Association"],
    requirements: "Stage setup, sound system, lighting rig, security personnel (20)",
    attachments: ["Cultural_Fest_Poster.pdf", "Event_Schedule.pdf", "Vendor_Quotes.xlsx"],
    timeline: [
      { label: "Submitted for review", time: "Oct 18, 2024, 10:00 AM", color: "#9CA3AF" },
      { label: "Rejected — low resolution poster", time: "Oct 21, 2024, 11:30 AM", color: "#EF4444" },
    ],
  },
  {
    id: "EVT-004",
    eventName: "National Science Day Seminar",
    dept: "Physics",
    hod: "Dr. Priya Nair",
    hodEmail: "phy.hod@notivo.edu",
    hodPhone: "+91 95432 10987",
    submitted: "Oct 22, 2024",
    eventDate: "Nov 28, 2024",
    venue: "Physics Lab & Lecture Hall 3",
    expectedAttendees: 200,
    status: "Pending Review",
    file: "Science_Day_Invite.pdf",
    icon: "🔬",
    previewBg: "#1D4ED8",
    category: "Academic",
    description:
      "National Science Day Seminar commemorating the discovery of the Raman Effect. The event features science quiz competitions, model exhibitions, guest lectures from ISRO scientists, and a special documentary screening on Indian contributions to global science.",
    agenda: [
      { time: "09:30 AM", activity: "Science Quiz — Preliminary Round" },
      { time: "11:00 AM", activity: "Guest Lecture: ISRO Scientist" },
      { time: "01:00 PM", activity: "Model Exhibition" },
      { time: "03:00 PM", activity: "Science Quiz — Finals" },
      { time: "04:30 PM", activity: "Documentary Screening" },
    ],
    budget: "₹35,000",
    sponsors: ["DST India", "College Science Club"],
    requirements: "Exhibition tables, projector, quiz buzzer system",
    attachments: ["Science_Day_Invite.pdf", "Quiz_Questions_Draft.docx"],
    timeline: [
      { label: "Submitted for review", time: "Oct 22, 2024, 11:00 AM", color: "#9CA3AF" },
    ],
  },
  {
    id: "EVT-005",
    eventName: "Sports Meet 2024",
    dept: "Physical Education",
    hod: "Mr. Ramesh Babu",
    hodEmail: "pe.hod@notivo.edu",
    hodPhone: "+91 94321 09876",
    submitted: "Oct 21, 2024",
    eventDate: "Dec 05, 2024",
    venue: "Main Sports Ground & Indoor Stadium",
    expectedAttendees: 800,
    status: "Approved",
    file: "Sports_Meet_Banner.pdf",
    icon: "⚽",
    previewBg: "#059669",
    category: "Sports",
    description:
      "The Annual Sports Meet 2024 will feature competitions in 15+ sports including Cricket, Football, Basketball, Volleyball, Athletics, Swimming, Chess, and Kabaddi. Inter-department competitions will be held over 2 days with medals and trophies awarded to winners.",
    agenda: [
      { time: "Day 1 - 08:00 AM", activity: "Opening Ceremony & March Past" },
      { time: "Day 1 - 09:00 AM", activity: "Cricket, Football, Athletics" },
      { time: "Day 2 - 09:00 AM", activity: "Basketball, Volleyball, Swimming" },
      { time: "Day 2 - 04:00 PM", activity: "Prize Distribution & Closing" },
    ],
    budget: "₹80,000",
    sponsors: ["Nike India", "Sports Authority of India"],
    requirements: "Sports equipment, referee uniforms (15 sets), medical team on standby",
    attachments: ["Sports_Meet_Banner.pdf", "Schedule.pdf", "Team_Registration.xlsx"],
    timeline: [
      { label: "Submitted for review", time: "Oct 21, 2024, 09:00 AM", color: "#9CA3AF" },
      { label: "Approved by admin", time: "Oct 23, 2024, 03:00 PM", color: "#10B981" },
    ],
  },
  {
    id: "EVT-006",
    eventName: "Inter-College Debate",
    dept: "Arts & Humanities",
    hod: "Dr. Lakshmi Patel",
    hodEmail: "ah.hod@notivo.edu",
    hodPhone: "+91 93210 98765",
    submitted: "Oct 23, 2024",
    eventDate: "Dec 10, 2024",
    venue: "Seminar Hall, Block B",
    expectedAttendees: 150,
    status: "Under Review",
    file: "Debate_Invitation.pdf",
    icon: "🎤",
    previewBg: "#DC2626",
    category: "Academic",
    description:
      "Annual inter-college debate competition open to all undergraduate students. Topics will cover current affairs, social issues, and philosophical arguments. Teams of 2 from each college will compete in elimination rounds. Distinguished judges from academia and journalism will evaluate.",
    agenda: [
      { time: "10:00 AM", activity: "Registration & Briefing" },
      { time: "11:00 AM", activity: "Preliminary Rounds" },
      { time: "02:00 PM", activity: "Semi-Final Rounds" },
      { time: "04:00 PM", activity: "Grand Final" },
      { time: "05:30 PM", activity: "Prize Distribution" },
    ],
    budget: "₹25,000",
    sponsors: ["Journalism Club", "Student Union"],
    requirements: "PA system, podiums (2), judging scorecards, certificates",
    attachments: ["Debate_Invitation.pdf", "Rules_and_Format.pdf"],
    timeline: [
      { label: "Submitted for review", time: "Oct 23, 2024, 02:00 PM", color: "#9CA3AF" },
      { label: "Under admin review", time: "Oct 24, 2024, 10:00 AM", color: "#2563EB" },
    ],
  },
  {
    id: "EVT-007",
    eventName: "Robotics Expo 2024",
    dept: "Mechanical Engineering",
    hod: "Prof. James Okafor",
    hodEmail: "me.hod@notivo.edu",
    hodPhone: "+91 96543 21098",
    submitted: "Oct 24, 2024",
    eventDate: "Dec 20, 2024",
    venue: "Engineering Block Lobby & Workshop",
    expectedAttendees: 300,
    status: "Pending Review",
    file: "Robotics_Expo_Poster.pdf",
    icon: "🤖",
    previewBg: "#7C3AED",
    category: "Technical",
    description:
      "Robotics Expo 2024 showcases student-built robots and automation projects. Categories include line-following robots, autonomous drones, robotic arms, and IoT projects. Industry judges from top robotics firms will evaluate projects. Best projects receive internship opportunities.",
    agenda: [
      { time: "09:00 AM", activity: "Setup & Registration" },
      { time: "10:00 AM", activity: "Expo Opens to Public" },
      { time: "12:00 PM", activity: "Judging Round 1" },
      { time: "02:00 PM", activity: "Live Demonstrations" },
      { time: "04:00 PM", activity: "Final Judging & Awards" },
    ],
    budget: "₹60,000",
    sponsors: ["Bosch India", "ABB Robotics"],
    requirements: "Power outlets (50+), display tables, demo arena 20x20ft",
    attachments: ["Robotics_Expo_Poster.pdf", "Registration_Form.pdf"],
    timeline: [
      { label: "Submitted for review", time: "Oct 24, 2024, 11:00 AM", color: "#9CA3AF" },
    ],
  },
  {
    id: "EVT-008",
    eventName: "Annual Literary Meet",
    dept: "Arts & Humanities",
    hod: "Dr. Lakshmi Patel",
    hodEmail: "ah.hod@notivo.edu",
    hodPhone: "+91 93210 98765",
    submitted: "Oct 25, 2024",
    eventDate: "Jan 10, 2025",
    venue: "Library Conference Room & Courtyard",
    expectedAttendees: 180,
    status: "Approved",
    file: "Literary_Meet_Invite.pdf",
    icon: "📚",
    previewBg: "#92400E",
    category: "Cultural",
    description:
      "The Annual Literary Meet celebrates reading, writing, and intellectual discourse. Events include poetry slam, short story competition, book reviews, author talk (virtual), and essay writing contest. Open to students of all departments.",
    agenda: [
      { time: "10:00 AM", activity: "Inauguration & Book Launch" },
      { time: "11:00 AM", activity: "Poetry Slam Competition" },
      { time: "01:00 PM", activity: "Virtual Author Talk" },
      { time: "02:30 PM", activity: "Short Story Finals" },
      { time: "04:00 PM", activity: "Essay Competition Results & Closing" },
    ],
    budget: "₹20,000",
    sponsors: ["Penguin India", "College Library Fund"],
    requirements: "Microphone, projector for virtual session, comfortable seating",
    attachments: ["Literary_Meet_Invite.pdf", "Competition_Rules.pdf"],
    timeline: [
      { label: "Submitted for review", time: "Oct 25, 2024, 09:00 AM", color: "#9CA3AF" },
      { label: "Approved by admin", time: "Oct 26, 2024, 11:00 AM", color: "#10B981" },
    ],
  },
];

export const SubmissionProvider = ({ children }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState(submissionsData);

  const updateSubmissionStatus = (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (selectedSubmission?.id === id) {
      setSelectedSubmission((prev) => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <SubmissionContext.Provider
      value={{
        selectedSubmission,
        setSelectedSubmission,
        submissions,
        updateSubmissionStatus,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmission = () => useContext(SubmissionContext);
