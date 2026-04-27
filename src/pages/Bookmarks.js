import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import BookCard from "../components/BookCard";

function Bookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Bookmarks</h1>
      <p className="text-gray-500 text-sm mb-6">
        Books are saved to your browser. They will stay here until you clear your browser data.
      </p>

      {/* Empty state */}
      {bookmarks.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-400 text-lg">No bookmarks yet.</p>
          <Link
            to="/"
            className="mt-4 inline-block text-indigo-600 hover:underline text-sm"
          >
            Browse books to get started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bookmarks.map((book, i) => (
            <BookCard key={book.key || i} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
