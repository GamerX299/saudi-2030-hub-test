import { useState, useMemo } from "react";
import { OPPORTUNITIES, TYPES, MAJORS, LOCATIONS } from "../data/opportunities";
import OpportunityCard from "../components/OpportunityCard";

export default function OpportunitiesPage({ bookmarkedIds, onBookmark }) {
  const [filters, setFilters] = useState({
    type: "All", major: "All Majors", location: "All Locations", paid: "All", search: ""
  });
  const [sort, setSort] = useState("deadline");

  const setFilter = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
  const clearFilters = () => setFilters({ type: "All", major: "All Majors", location: "All Locations", paid: "All", search: "" });
  const hasActiveFilters = filters.type !== "All" || filters.major !== "All Majors" || filters.location !== "All Locations" || filters.paid !== "All" || filters.search;

  const filtered = useMemo(() => {
    return OPPORTUNITIES
      .filter(o => {
        if (filters.type !== "All" && o.type !== filters.type) return false;
        if (filters.major !== "All Majors" && o.major !== filters.major) return false;
        if (filters.location !== "All Locations" && o.location !== filters.location) return false;
        if (filters.paid === "Paid" && !o.paid) return false;
        if (filters.paid === "Unpaid" && o.paid) return false;
        if (filters.search && !o.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !o.company.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => sort === "deadline"
        ? new Date(a.deadline) - new Date(b.deadline)
        : a.title.localeCompare(b.title));
  }, [filters, sort]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Find Your Opportunity</h1>
          <p>{filtered.length} opportunities · {bookmarkedIds.size} saved</p>
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
          <option value="deadline">Sort: Nearest Deadline</option>
          <option value="title">Sort: A–Z</option>
        </select>
      </div>

      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder="Search by title or company..."
          value={filters.search}
          onChange={e => setFilter("search", e.target.value)}
        />
      </div>

      <div className="filter-bar">
        {TYPES.map(t => (
          <button key={t} className={`pill ${filters.type === t ? "pill-active" : ""}`} onClick={() => setFilter("type", t)}>
            {t}
          </button>
        ))}
        <select className="filter-select" value={filters.major} onChange={e => setFilter("major", e.target.value)}>
          {MAJORS.map(m => <option key={m}>{m}</option>)}
        </select>
        <select className="filter-select" value={filters.location} onChange={e => setFilter("location", e.target.value)}>
          {LOCATIONS.map(l => <option key={l}>{l}</option>)}
        </select>
        <select className="filter-select" value={filters.paid} onChange={e => setFilter("paid", e.target.value)}>
          {["All", "Paid", "Unpaid"].map(o => <option key={o}>{o}</option>)}
        </select>
        {hasActiveFilters && (
          <button className="clear-btn" onClick={clearFilters}>✕ Clear</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span>🔎</span>
          <p>No opportunities match your filters.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(opp => (
            <OpportunityCard key={opp.id} opp={opp} isBookmarked={bookmarkedIds.has(opp.id)} onBookmark={onBookmark} />
          ))}
        </div>
      )}
    </div>
  );
}