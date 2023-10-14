import React, { useState, useCallback } from "react";
import Tracklist from "./Tracklist";

export default function Playlist(props) {
  const handleNameChange = useCallback(
    (event) => {
      props.handleNameChange(event.target.value);
    },
    [props.handleNameChange]
  );

  return (
    <div className="playlist-container">
      <input
        className="playlist-name"
        onChange={handleNameChange}
        value={props.playlistName}
      />
      <Tracklist
        tracks={props.playlistTracks}
        handleSelectTracks={props.handleSelectTracks}
        onRemoval={true}
      />
      <div className="save-button-container">
        <button className="save-button" onClick={props.onCreate}>
          SAVE TO SPOTIFY
        </button>
      </div>
    </div>
  );
}
