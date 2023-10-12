import React from 'react';

export default function Track(props) {
  
  function handleSelectSongs() {
    props.handleSelectSongs(props.track.id)
  }

  return (
    <div className="track">
      <div className ="track-info">
        <h4>
          {props.track.name}
        </h4>
        <p>{props.track.artist} || {props.track.album}</p>
      </div>
      <span onClick={handleSelectSongs}>{props.onRemoval ? "-" : "+"}</span>
    </div>
  )
}