import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// استيراد المكونات (تأكد أن الملفات موجودة في مجلد pages و src)
import Navbar from "./Navbar"; 
import OpportunitiesPage from "./pages/OpportunitiesPage"; 
import DeadlineTrackerPage from "./pages/DeadlineTrackerPage"; 

function App() {
  // --- منطق حفظ المفضلات (LocalStorage) ---
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem("opportunity_bookmarks");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("opportunity_bookmarks", JSON.stringify([...bookmarkedIds]));
  }, [bookmarkedIds]);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="app-container" style={{ direction: "ltr", fontFamily: "Segoe UI, sans-serif" }}>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h1 style={{ color: "#00539C", fontSize: "40px" }}>2030 Opportunity Hub</h1>
              <p style={{ color: "#667" }}>Discover and Track Saudi Vision 2030 Opportunities</p>
            </div>
          } />

          {/* صفحة الفرص (عبد الرحمن) */}
          <Route path="/opportunities" element={
            <OpportunitiesPage bookmarkedIds={bookmarkedIds} onBookmark={toggleBookmark} />
          } />

          {/* لوحة تحكم الطالب / المتتبع (عبد الرحمن) */}
          <Route path="/student" element={
            <DeadlineTrackerPage bookmarkedIds={bookmarkedIds} onBookmark={toggleBookmark} />
          } />

          {/* بوابة الشركات (مهمتك الأساسية - Frontend 1) */}
          <Route path="/provider" element={<ProviderDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

/**
 * مكون لوحة تحكم الشركات (Provider Dashboard)
 * تم الربط مع السكيما: title, type, description, eligibility, location, apply_link, deadline, major
 */
function ProviderDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    type: "Internship",
    description: "",
    eligibility: "",
    location: "",
    apply_link: "",
    deadline: "",
    major: "",
    is_paid: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("JSON for Hiba's Backend:", formData);
    alert("Opportunity Data Sent to Console! Ready for Backend Integration.");
  };

  const inputStyle = { 
    display: "block", 
    width: "100%", 
    padding: "12px", 
    marginBottom: "15px", 
    borderRadius: "8px", 
    border: "1px solid #ddd",
    boxSizing: "border-box" 
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "30px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#00539C", textAlign: "center", marginBottom: "25px" }}>Post New Opportunity</h2>
      
      <form onSubmit={handleSubmit}>
        <label style={{fontWeight: "bold", fontSize: "14px"}}>Opportunity Title</label>
        <input name="title" placeholder="e.g. Software Engineering Internship" required style={inputStyle} onChange={handleChange} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div>
            <label style={{fontWeight: "bold", fontSize: "14px"}}>Type</label>
            <select name="type" style={inputStyle} onChange={handleChange}>
              <option value="Internship">Internship</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Bootcamp">Bootcamp</option>
              <option value="COOP">COOP</option>
            </select>
          </div>
          <div>
            <label style={{fontWeight: "bold", fontSize: "14px"}}>Target Major</label>
            <input name="major" placeholder="e.g. CS, IT, IS" style={inputStyle} onChange={handleChange} />
          </div>
        </div>

        <label style={{fontWeight: "bold", fontSize: "14px"}}>Description</label>
        <textarea name="description" placeholder="Describe the role and responsibilities" required style={{ ...inputStyle, height: "100px", resize: "none" }} onChange={handleChange} />

        <label style={{fontWeight: "bold", fontSize: "14px"}}>Eligibility & Location</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <input name="eligibility" placeholder="e.g. GPA 3.5+" style={inputStyle} onChange={handleChange} />
          <input name="location" placeholder="e.g. Riyadh / Remote" style={inputStyle} onChange={handleChange} />
        </div>

        <label style={{fontWeight: "bold", fontSize: "14px"}}>Apply Link (URL)</label>
        <input name="apply_link" type="url" placeholder="https://company.com/apply" required style={inputStyle} onChange={handleChange} />

        <label style={{fontWeight: "bold", fontSize: "14px"}}>Deadline</label>
        <input name="deadline" type="date" required style={inputStyle} onChange={handleChange} />

        <label style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", cursor: "pointer" }}>
          <input name="is_paid" type="checkbox" onChange={handleChange} />
          <span style={{ fontSize: "14px" }}>Is this a paid opportunity?</span>
        </label>

        <button type="submit" style={{ width: "100%", padding: "14px", background: "#00539C", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
          Publish to 2030 Hub
        </button>
      </form>
    </div>
  );
}

export default App;