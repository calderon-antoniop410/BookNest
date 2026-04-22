BookNest E-Book Library Web App

A React-based web application for browsing, searching, and reading free eBooks online.

---

## Overview

BookNest is a web application built with React that allows users to discover and read free eBooks in a clean, organized interface. It integrates with the Open Library API to fetch book data, including titles, authors, descriptions, and cover images.

The goal of the project is to simplify access to free reading resources by providing structured navigation, search capabilities, and bookmarking features in a user-friendly design.

---

## Tech Stack

* **React** - Frontend framework
* **React Router** — Client-side routing
* **Open Library API** — Book data and covers
* **Tailwind CSS** — Styling and responsive layout
* **localStorage** — Persistent bookmark storage

---

## Features

### 1. Search Functionality

Users can search for books by title, author, or keywords. Results update dynamically as the user types, and each result links to a detailed view.

### 2. Book Categories / Genres

Books can be browsed by category (e.g., Fiction, Science, History). Selecting a category updates the displayed results accordingly.

### 3. Book Details Page

Each book has a dedicated page showing detailed information such as title, author, description, and cover image.

### 4. Bookmark / Favorites System

Users can save books to a personal list using localStorage. Saved books can be accessed on a separate bookmarks page without requiring authentication.

### 5. Responsive UI

The interface is fully responsive and adapts to different screen sizes, ensuring usability across mobile, tablet, and desktop devices.

### 6. Reading / Preview Feature

Where available, users can preview or read books through embedded viewers or external links.

### 7. Navigation & Routing

The app uses client-side routing for smooth transitions between pages such as Home, Search, Bookmarks, and Book Details.

---

## Optional Enhancements

* Dark mode toggle
* Sorting (popularity, rating, newest)
* Recently viewed books
* Loading animations
