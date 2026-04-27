import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";

// List of browsable categories
const CATEGORIES = [
  { label: "Fiction", value: "fiction" },
  { label: "Science", value: "science" },
  { label: "History", value: "history" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Mystery", value: "mystery" },
  { label: "Romance", value: "romance" },
  { label: "Horror", value: "horror" },
  { label: "Biography", value: "biography" },
];

function Home() {
  const [activeCategory, setActiveCategory] = useState("fiction");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch books whenever the active category changes
  useEffect(() => {
    const fetchByCategory = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/subjects/${activeCategory}.json?limit=12`
        );
        const data = await res.json();
        // Normalize subject works to match search result shape
        const normalized = (data.works || []).map((w) => ({
          key: w.key,
          title: w.title,
          author_name: w.authors?.map((a) => a.name),
          cover_i: w.cover_id,
          first_publish_year: w.first_publish_year,
        }));
        setBooks(normalized);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchByCategory();
  }, [activeCategory]);

  // Send user to search page with their query
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Welcome to BookNest</h1>
        <p className="text-gray-500 text-lg mb-6">Discover and read free eBooks online</p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a book, author, or keyword..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === cat.value
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Book grid */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.map((book, i) => (
            <BookCard key={book.key || i} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
