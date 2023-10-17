import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderNone,
  faPlayCircle,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Track(props) {
  function handleSelectTracks() {
    props.handleSelectTracks(props.track.id);
  }

  function togglePlayControl() {
    props.togglePlayControl(props.track.id);
  }

  function playTrack() {
    props.onPlay(props.track.id);
  }

  function pauseTrack() {
    props.onPause(props.track.id);
  }

  function playBundle() {
    togglePlayControl();
    playTrack();
  }

  function pauseBundle() {
    togglePlayControl();
    pauseTrack();
  }

  return (
    <div className="track">
      <div className="track-info">
        <h4>{props.track.name}</h4>
        <p>
          {props.track.artist} || {props.track.album}
        </p>
      </div>
      <div className="track-functions">
        {!props.onRemoval &&
          (!props.track.isPlay ? (
            <FontAwesomeIcon
              icon={faPlayCircle}
              onClick={playBundle}
              style={{ border: faBorderNone }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPauseCircle}
              onClick={pauseBundle}
              style={{ border: faBorderNone }}
            />
          ))}
        <span onClick={handleSelectTracks}>{props.onRemoval ? "-" : "+"}</span>
      </div>
    </div>
  );
}
