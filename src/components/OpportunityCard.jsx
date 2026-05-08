import { TYPE_COLORS, daysLeft } from "../data/opportunities";

export default function OpportunityCard({ opp, isBookmarked, onBookmark }) {
  const colors = TYPE_COLORS[opp.type] || { bg: "#f5f5f5", text: "#333", dot: "#999" };
  const days = daysLeft(opp.deadline);
  const urgency = days <= 7 ? "#ef4444" : days <= 14 ? "#f97316" : "#10b981";

  return (
    <div className="opp-card">
      <div className="card-top">
        <span className="type-badge" style={{ background: colors.bg, color: colors.text }}>
          <span className="dot" style={{ background: colors.dot }} />
          {opp.type}
        </span>
        <button className="bookmark-btn" onClick={() => onBookmark(opp.id)}>
          {isBookmarked ? "🔖" : "🤍"}
        </button>
      </div>
      <div>
        <h3 className="card-title">{opp.title}</h3>
        <p className="card-sub">{opp.company} · {opp.location}</p>
      </div>
      <p className="card-desc">{opp.description}</p>
      <div className="card-tags">
        <span className="tag">{opp.major}</span>
        <span className="tag" style={{ background: opp.paid ? "#e8f5e9" : "#fff8e1", color: opp.paid ? "#2e7d32" : "#f57f17" }}>
          {opp.paid ? "💰 Paid" : "Unpaid"}
        </span>
      </div>
      <div className="card-footer">
        <span style={{ color: urgency, fontSize: 12, fontWeight: 700 }}>
          ⏰ {days > 0 ? `${days} days left` : "Expired"}
        </span>
        <a href={opp.link} className="apply-btn">Apply →</a>
      </div>
    </div>
  );
}
