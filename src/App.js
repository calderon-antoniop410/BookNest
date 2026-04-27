import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import BookDetails from "./pages/BookDetails";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
