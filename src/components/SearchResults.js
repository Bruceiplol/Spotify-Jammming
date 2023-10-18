import React from "react";
import Tracklist from "./Tracklist";

export default function SearchResults(props) {
  function nextPage() {
    props.setPage((prev) => prev + 1);
  }

  function backPage() {
    props.setPage((prev) => prev - 1);
  }

  function searchNextPage() {
    nextPage();
    props.onSearch(props.prevSearchTerm, props.page + 1);
  }

  function searchBackPage() {
    backPage();
    props.onSearch(props.prevSearchTerm, props.page - 1);
  }

  const style = {
    justifyContent: "flex-end",
  };

  const turnPageButtonsWFirstPage = (
    <div className="turn-page-buttons" style={style}>
      {props.page > 1 && (
        <p className="back-page-button" onClick={searchBackPage}>
          {"<"} Previous page
        </p>
      )}
      <p className="next-page-button" onClick={searchNextPage}>
        Next page {">"}
      </p>
    </div>
  );

  const turnPageButtons = (
    <div className="turn-page-buttons">
      {props.page > 1 && (
        <p className="back-page-button" onClick={searchBackPage}>
          {"<"} Previous page
        </p>
      )}
      <p className="next-page-button" onClick={searchNextPage}>
        Next page {">"}
      </p>
    </div>
  );

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
        <React.Fragment>
          {props.page <= 1 ? turnPageButtonsWFirstPage : turnPageButtons}
        </React.Fragment>
      )}
    </div>
  );
}