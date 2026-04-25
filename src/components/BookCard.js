import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";

// Card displayed in search results and category grids
function BookCard({ book }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const coverId = book.cover_i || (book.cover_edition_key ? null : null);
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const bookId = book.key?.replace("/works/", "");
  const title = book.title || "Unknown Title";
  const author = book.author_name?.[0] || "Unknown Author";
  const year = book.first_publish_year || "";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Cover image */}
      <Link to={`/book/${bookId}`}>
        <div className="w-full h-52 bg-indigo-50 flex items-center justify-center overflow-hidden">
          {coverUrl ? (
            <img src={coverUrl} alt={title} className="h-full w-full object-cover" />
          ) : (
            <span className="text-5xl">📖</span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link to={`/book/${bookId}`}>
            <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1">{author}</p>
          {year && <p className="text-xs text-gray-400 mt-0.5">{year}</p>}
        </div>

        {/* Bookmark button */}
        <button
          onClick={() => toggleBookmark(book)}
          className={`mt-3 w-full py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isBookmarked(bookId)
              ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
        >
          {isBookmarked(bookId) ? "★ Bookmarked" : "☆ Bookmark"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
