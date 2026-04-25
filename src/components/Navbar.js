import { Link, useLocation } from "react-router-dom";

// Navbar with links to all pages
function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          📚 BookNest
        </Link>
        <div className="flex gap-2">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/search" className={linkClass("/search")}>Search</Link>
          <Link to="/bookmarks" className={linkClass("/bookmarks")}>Bookmarks</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
