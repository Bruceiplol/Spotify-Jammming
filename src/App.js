import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import {
  getToken,
  getSongs,
  createPlaylist,
  playTrack,
  pauseTrack,
} from "./util/Spotify";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [currentListening, setCurrentListening] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  let prevPage;

  getToken();
  const search = useCallback((searchTerm, page) => {
    if (searchTerm !== prevSearchTerm) {
      setPage(1);
      getSongs(searchTerm, page).then(setSearchResults);
      setPrevSearchTerm(searchTerm);
      prevPage = page;
      setSearching(() => {
        if (searchTerm) {
          return true;
        }
      });
      if (currentListening) {
        onPause(currentListening);
      }
    } else if (searchTerm === prevSearchTerm && page !== prevPage) {
      getSongs(prevSearchTerm, page + 1).then(setSearchResults);
      prevPage = page;
    }
  });

  const handleSelectTracks = useCallback((id) => {
    const selectedTrack = searchResults.find((track) => track.id === id);
    const selectedTrack2 = playlistTracks.find((track) => track.id === id);
    if (selectedTrack) {
      setPlaylistTracks((prev) => [...prev, selectedTrack]);
      setSearchResults((prev) => prev.filter((track) => track.id !== id));
    } else {
      setPlaylistTracks((prev) =>
        prev.filter((track) => track.id !== selectedTrack2.id)
      );
      setSearchResults((prev) =>
        [...prev, selectedTrack2].toSorted((a, b) => a.position - b.position)
      );
    }
  });

  const handleNameChange = useCallback((playlistName) => {
    setPlaylistName(playlistName);
  });

  const handleCreatePlaylist = useCallback(() => {
    const trackUri = playlistTracks.map((track) => track.uri);
    createPlaylist(playlistName, trackUri).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  const togglePlayControl = useCallback(
    (id) => {
      setSearchResults((prev) =>
        prev.map((track) => {
          return track.id === id ? { ...track, isPlay: !track.isPlay } : track;
        })
      );
    },
    [searchResults]
  );

  const onPlay = useCallback((id) => {
    const selectedTrack = searchResults.find((track) => track.id === id);
    if (currentListening !== id) {
      togglePlayControl(currentListening);
    }
    setCurrentListening(id);
    playTrack(selectedTrack.uri).catch(() => togglePlayControl(id));
  });

  const onPause = useCallback((id) => {
    const selectedTrack = searchResults.find((track) => track.id === id);
    setCurrentListening("");
    pauseTrack(selectedTrack.uri);
  });

  return (
    <div>
      <div className="heading">
        <h1>
          Ja<span>mmm</span>ing
        </h1>
      </div>
      <SearchBar onSearch={search} page={page} setPage={setPage} />
      <main className="main-lists">
        <SearchResults
          searchResults={searchResults}
          handleSelectTracks={handleSelectTracks}
          togglePlayControl={togglePlayControl}
          onPlay={onPlay}
          onPause={onPause}
          searching={searching}
          prevSearchTerm={prevSearchTerm}
          page={page}
          setPage={setPage}
          onSearch={search}
        />
        <Playlist
          playlistTracks={playlistTracks}
          handleSelectTracks={handleSelectTracks}
          playlistName={playlistName}
          handleNameChange={handleNameChange}
          onCreate={handleCreatePlaylist}
        />
      </main>
    </div>
  );
}

export default App;
