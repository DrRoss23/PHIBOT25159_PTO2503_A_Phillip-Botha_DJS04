# DJS04 – React Podcast Discovery App

A feature-rich React application for browsing and discovering podcasts with **live search**, **sorting**, **genre filtering**, and **load‑more pagination**.  
This project demonstrates centralized state management, synchronized UI controls, and clean, maintainable React architecture.

---

## 🔍 Project Overview

The goal of this project was to build a **real-world podcast browsing experience** that allows users to:

- Search podcasts by title in real time
- Sort results by newest or alphabetically
- Filter podcasts by multiple genres
- Browse results incrementally using a _Load More_ pagination pattern
- Maintain consistent UI state across all interactions

The application is built using **React + Vite** and follows a clean, modular structure designed for clarity, scalability, and ease of explanation during review.

---

## ✨ Key Features

### 🔎 Live Search

- Matches any part of a podcast title
- Updates results instantly as the user types
- Works seamlessly with sorting, filtering, and pagination

### 🔀 Sorting

- Newest first (based on last updated date)
- Title A–Z
- Title Z–A
- Sorting never resets active search or filters

### 🧪 Genre Filtering

- Multi-select dropdown for genres
- Genre IDs mapped to human-readable titles
- Multiple genres can be selected at once
- Filters persist while browsing and loading more results

### 📄 Load More Pagination

- Displays podcasts in manageable chunks (4 at a time)
- “Load more” button appends additional results
- Automatically resets when search, sort, or filter criteria change
- Button disappears when all results are visible

### 🔄 State Synchronization

- All UI state is centralized in a single React Context
- Search, sort, filter, and pagination remain fully synchronized
- No UI resets or conflicting states

---

## 🧠 Architecture & Design Decisions

- **Centralized State**:  
  All application state lives in `PodcastContext`, ensuring a single source of truth.

- **Derived Data Pipeline**:  
  Podcast data flows through a deterministic pipeline:

  ```
  Fetch → Search → Filter → Sort → Visible Slice
  ```

- **Presentational Components**:  
  UI components are kept stateless where possible and receive pre-processed data from context.

- **Incremental Pagination**:  
  A _load-more_ strategy was chosen over page numbers for simplicity, UX clarity, and rubric alignment.

---

## 🛠️ Tech Stack

- **React** (Hooks & Context API)
- **Vite** (Fast dev server & build tool)
- **JavaScript (ES6+)**
- **CSS** (Responsive, mobile-first design)
- **Public Podcast API**

---

## 📁 Project Structure

```
src/
├── api/
│   └── fetchPodcasts.js
├── components/
│   ├── Controls.jsx
│   ├── SearchBar.jsx
│   ├── SortSelect.jsx
│   ├── GenreDropdown.jsx
│   ├── PodcastGrid.jsx
│   └── PodcastCard.jsx
├── context/
│   └── PodcastContext.jsx
├── data/
│   └── genres.js
├── utils/
│   └── formatDate.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 📚 Documentation & Code Quality

- JSDoc comments added to all major files
- Clean, consistent naming conventions
- Modular and reusable components
- No unused code or dead logic

---

## ✅ Project Requirements Checklist

✔ Fetches and displays podcast data  
✔ Live search functionality  
✔ Sorting options implemented  
✔ Genre filtering with ID → title mapping  
✔ Load-more pagination  
✔ Centralized, synchronized state  
✔ Responsive layout (mobile, 1080p, 1440p, 4K)  
✔ Clean, maintainable codebase  
✔ Comprehensive documentation

---

## 📌 Notes

This project was developed with a strong focus on **clarity, predictability, and reviewer readability**.  
All architectural decisions were made intentionally

---

## 👤 Author

**Phillip-Rossouw Botha**  
DJS04 – React Podcast App  
CodeSpace Academy

---
