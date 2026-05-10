import { Link } from "react-router-dom";

const Navbar = () => {
  const linkStyle = { color: "white", textDecoration: "none", fontWeight: "500", padding: "8px 15px" };

  return (
    <nav style={{ background: "#00539C", padding: "14px 32px", display: "flex", alignItems: "center", color: "white" }}>
      <div style={{ fontWeight: "bold", fontSize: "22px", marginRight: "auto" }}>2030 Hub</div>
      <div style={{ display: "flex", gap: "10px" }}>
        {/* هذه الروابط هي التي تجعل التنقل يعمل مع الـ Router الجديد */}
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/opportunities">Opportunities</Link>
        <Link style={linkStyle} to="/student">Student Dashboard</Link>
        <Link style={linkStyle} to="/provider">Provider Portal</Link>
      </div>
    </nav>
  );
};

export default Navbar;