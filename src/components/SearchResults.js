import React, { useState, useEffect } from "react";
import Tracklist from "./Tracklist";

export default function SearchResults(props) {
  function nextPage() {
    props.setPage((prev) => prev + 1);
  }

  function searchNextPage() {
    nextPage();
    props.onSearch(props.prevSearchTerm, props.page);
  }

  return (
    <div className="search-results-container">
      <h1>Results</h1>
      <Tracklist
        tracks={props.searchResults}
        handleSelectTracks={props.handleSelectTracks}
        onRemoval={false}
        togglePlayControl={props.togglePlayControl}
        onPlay={props.onPlay}
        onPause={props.onPause}
      />
      {props.searching && (
        <p className="next-page-button" onClick={searchNextPage}>
          Next page {">"}
        </p>
      )}
    </div>
  );
}
