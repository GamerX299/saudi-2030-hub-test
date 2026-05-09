import { useState } from "react";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import DeadlineTrackerPage from "./pages/DeadlineTrackerPage";
import "./index.css";

function App() {
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [activePage, setActivePage] = useState("opportunities");

  const handleBookmark = (id) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      {
      <nav style={{ background: "#0f172a", padding: "14px 32px", display: "flex", gap: 16 }}>
        <button onClick={() => setActivePage("opportunities")}
          style={{ color: activePage === "opportunities" ? "#60a5fa" : "#94a3b8", background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
          🔍 Opportunities
        </button>
        <button onClick={() => setActivePage("tracker")}
          style={{ color: activePage === "tracker" ? "#60a5fa" : "#94a3b8", background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
          📌 Tracker ({bookmarkedIds.size})
        </button>
      </nav>

      {activePage === "opportunities"
        ? <OpportunitiesPage bookmarkedIds={bookmarkedIds} onBookmark={handleBookmark} />
        : <DeadlineTrackerPage bookmarkedIds={bookmarkedIds} onBookmark={handleBookmark} />
      }
    </div>
  );
}

export default App;
