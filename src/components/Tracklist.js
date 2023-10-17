import React from "react";
import Track from "./Track";

export default function Tracklist(props) {
  const trackElement = props.tracks.map((track) => (
    <Track
      track={track}
      key={track.id}
      onRemoval={props.onRemoval}
      handleSelectTracks={props.handleSelectTracks}
      togglePlayControl={props.togglePlayControl}
      onPlay={props.onPlay}
      onPause={props.onPause}
    />
  ));

  return <div>{trackElement}</div>;
}
