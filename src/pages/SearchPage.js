import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Run a search whenever the URL query param changes
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      runSearch(q);
    }
  }, [searchParams]);

  const runSearch = async (q) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=20`
      );
      const data = await res.json();
      setResults(data.docs || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) setSearchParams({ q: query.trim() });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Search Books</h1>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or keyword..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Search
        </button>
      </form>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          <p className="text-sm text-gray-500 mb-4">{results.length} results found</p>
          {results.length === 0 ? (
            <p className="text-gray-400 text-center mt-12">No books found. Try a different search.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((book, i) => (
                <BookCard key={book.key || i} book={book} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty state before search */}
      {!loading && !searched && (
        <p className="text-gray-400 text-center mt-12">Type something above to search for books.</p>
      )}
    </div>
  );
}

export default SearchPage;
