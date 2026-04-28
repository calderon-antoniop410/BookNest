import { useState, useEffect } from "react";

// Custom hook to manage bookmarks saved in localStorage
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("booknest-bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("booknest-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id) => bookmarks.some((b) => b.key?.replace("/works/", "") === id);

  const toggleBookmark = (book) => {
    const id = book.key?.replace("/works/", "");
    if (isBookmarked(id)) {
      setBookmarks((prev) => prev.filter((b) => b.key?.replace("/works/", "") !== id));
    } else {
      setBookmarks((prev) => [...prev, book]);
    }
  };

  return { bookmarks, isBookmarked, toggleBookmark };
}
