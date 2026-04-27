import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Fetch full book details from Open Library
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!book) {
    return <p className="text-center text-gray-400 mt-12">Book not found.</p>;
  }

  const coverUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null;

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available.";

  // Build a normalized book object for bookmark toggling
  const bookmarkData = {
    key: book.key,
    title: book.title,
    cover_i: book.covers?.[0] || null,
  };

  const readUrl = `https://openlibrary.org${book.key}`;

  return (
    <div>
      {/* Back button */}
      <Link to="/" className="text-indigo-600 hover:underline text-sm mb-6 inline-block">
        ← Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Cover */}
        <div className="flex-shrink-0 flex justify-center">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="w-44 h-64 object-cover rounded-xl shadow"
            />
          ) : (
            <div className="w-44 h-64 bg-indigo-50 rounded-xl flex items-center justify-center text-6xl shadow">
              📖
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>

          {book.subjects && (
            <div className="flex flex-wrap gap-1 mb-4">
              {book.subjects.slice(0, 5).map((s) => (
                <span
                  key={s}
                  className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

          <div className="flex flex-wrap gap-3">
            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(bookmarkData)}
              className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                isBookmarked(id)
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              {isBookmarked(id) ? "★ Bookmarked" : "☆ Bookmark"}
            </button>

            {/* Read on Open Library */}
            <a
              href={readUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-lg font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
            >
              Read / Preview →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
