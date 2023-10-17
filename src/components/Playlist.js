import React, { useCallback } from "react";
import Tracklist from "./Tracklist";

export default function Playlist(props) {
  const onChange = useCallback(
    (event) => {
      props.handleNameChange(event.target.value);
    },
    [props]
  );

  return (
    <div className="playlist-container">
      <input
        className="playlist-name"
        onChange={onChange}
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
