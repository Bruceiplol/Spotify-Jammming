import React, { useState, useCallback } from "react";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const searchTitle = useCallback(() => {
    props.onSearch(searchTerm);
  }, [props.onSearch, searchTerm]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        searchTitle();
      }
    },
    [searchTitle]
  );

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
      <button className="search-button" onClick={searchTitle}>
        SEARCH
      </button>
    </div>
  );
}
