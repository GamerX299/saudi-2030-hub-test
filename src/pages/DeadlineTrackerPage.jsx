import { OPPORTUNITIES, daysLeft } from "../data/opportunities";
import OpportunityCard from "../components/OpportunityCard";

export default function DeadlineTrackerPage({ bookmarkedIds, onBookmark }) {
  const bookmarked = OPPORTUNITIES
    .filter(o => bookmarkedIds.has(o.id))
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (bookmarked.length === 0) {
    return (
      <div className="page">
        <h1>📌 Deadline Tracker</h1>
        <div className="empty-state">
          <span>📌</span>
          <p>Bookmark opportunities to track their deadlines here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>📌 Deadline Tracker</h1>
          <p>{bookmarked.length} saved · sorted by nearest deadline</p>
        </div>
      </div>

      <div className="tracker-list">
        {bookmarked.map(opp => {
          const days = daysLeft(opp.deadline);
          const pct = Math.max(0, Math.min(100, 100 - (days / 60) * 100));
          const color = days <= 7 ? "#ef4444" : days <= 14 ? "#f97316" : "#10b981";
          return (
            <div key={opp.id} className="tracker-item">
              <div className="tracker-row">
                <span className="tracker-title">{opp.title}</span>
                <span style={{ color, fontWeight: 700, fontSize: 13 }}>{days > 0 ? `${days}d left` : "Expired"}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
              </div>
              <p className="tracker-date">
                Deadline: {new Date(opp.deadline).toLocaleDateString("en-SA", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          );
        })}
      </div>

      <h2 style={{ marginTop: 32, marginBottom: 16 }}>Your Saved Opportunities</h2>
      <div className="cards-grid">
        {bookmarked.map(opp => (
          <OpportunityCard key={opp.id} opp={opp} isBookmarked={true} onBookmark={onBookmark} />
        ))}
      </div>
    </div>
  );
}
