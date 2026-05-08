export const OPPORTUNITIES = [
  { id: 1, title: "SABIC Engineering Internship", type: "Internship", paid: true, company: "SABIC", major: "Engineering", location: "Riyadh", deadline: "2026-12-15", description: "Hands-on experience in chemical & industrial engineering.", link: "#" },
  { id: 2, title: "King Abdullah Scholarship", type: "Scholarship", paid: true, company: "Ministry of Education", major: "All Majors", location: "International", deadline: "2026-11-30", description: "Full scholarship for outstanding Saudi students to study abroad.", link: "#" },
  { id: 3, title: "Aramco COOP Program", type: "COOP", paid: true, company: "Saudi Aramco", major: "Engineering", location: "Dhahran", deadline: "2026-11-01", description: "28-week cooperative training for penultimate-year engineering students.", link: "#" },
  { id: 4, title: "KACST Research Competition", type: "Competition", paid: false, company: "KACST", major: "Science & Tech", location: "Riyadh", deadline: "2026-08-20", description: "National research competition for STEM students. Cash prizes for top 3.", link: "#" },
  { id: 5, title: "STC Innovation Bootcamp", type: "Bootcamp", paid: false, company: "STC", major: "Computer Science", location: "Online", deadline: "2026-09-25", description: "8-week intensive program on 5G, IoT, and digital transformation.", link: "#" },
  { id: 6, title: "Noon Frontend Internship", type: "Internship", paid: true, company: "Noon", major: "Computer Science", location: "Riyadh", deadline: "2026-08-10", description: "Build next-gen e-commerce experiences for millions of users.", link: "#" },
  { id: 7, title: "PIF Strategy COOP", type: "COOP", paid: true, company: "Public Investment Fund", major: "Business", location: "Riyadh", deadline: "2026-07-15", description: "Work on billion-dollar investment projects shaping Saudi's future.", link: "#" },
  { id: 8, title: "Tuwaiq Academy Web Dev", type: "Bootcamp", paid: false, company: "Tuwaiq Academy", major: "Computer Science", location: "Jeddah", deadline: "2026-08-28", description: "Free full-stack bootcamp, 12 weeks, with job placement support.", link: "#" },
  { id: 9, title: "Misk Entrepreneurship Grant", type: "Competition", paid: true, company: "Misk Foundation", major: "Business", location: "Riyadh", deadline: "2026-06-01", description: "SAR 500,000 in grants for innovative Vision 2030 startup ideas.", link: "#" },
  { id: 10, title: "Namaa Design Internship", type: "Internship", paid: false, company: "Namaa", major: "Design", location: "Jeddah", deadline: "2026-05-05", description: "Build your portfolio with real branding, UI/UX, and motion projects.", link: "#" },
];

export const TYPES = ["All", "Internship", "Scholarship", "COOP", "Competition", "Bootcamp"];
export const MAJORS = ["All Majors", "Engineering", "Computer Science", "Business", "Science & Tech", "Design"];
export const LOCATIONS = ["All Locations", "Riyadh", "Jeddah", "Dhahran", "Online", "International"];

export const TYPE_COLORS = {
  Internship:  { bg: "#e8f5e9", text: "#2e7d32", dot: "#4caf50" },
  Scholarship: { bg: "#e3f2fd", text: "#1565c0", dot: "#2196f3" },
  COOP:        { bg: "#fff3e0", text: "#e65100", dot: "#ff9800" },
  Competition: { bg: "#fce4ec", text: "#880e4f", dot: "#e91e63" },
  Bootcamp:    { bg: "#f3e5f5", text: "#4a148c", dot: "#9c27b0" },
};

export function daysLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}