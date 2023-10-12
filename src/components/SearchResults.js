import React from 'react';
import Tracklist from './Tracklist';

export default function SearchResults(props) {
  
  
  return (
    <div className="search-results-container">
      <h1>
        Results
      </h1>
      <Tracklist 
        tracks={props.searchResults}
        handleSelectSongs={props.handleSelectSongs}
        onRemoval = {false}
      />
    </div>
  )
}