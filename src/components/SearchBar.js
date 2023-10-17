import React, { useState, useCallback } from "react";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  function searchTitle() {
    props.onSearch(searchTerm, props.page);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      searchTitle();
    }
  }

  function clear() {
    setSearchTerm("");
  }

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Enter A Song Title Or Artist"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button className="clear-button" onClick={clear}>
        clear
      </button>
      <button className="search-button" onClick={searchTitle}>
        SEARCH
      </button>
    </div>
  );
}
