import React, { useEffect, useRef, useState } from "react";

const Navbar = ({ movies, query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🎬</span>
          <h1>MovieMemo</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputEl}
        />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
    </div>
  );
};

export default Navbar;
