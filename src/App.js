import "./App.css";
import React, { useState, useCallback } from "react";
import { getToken, getSongs, createPlaylist } from "./util/Spotify";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  let prevSearchTerm;

  const search = useCallback((searchTerm) => {
    if (searchTerm !== prevSearchTerm) {
      getSongs(searchTerm).then(setSearchResults);
      prevSearchTerm = searchTerm;
    }
  }, []);

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

  return (
    <div>
      <div className="heading">
        <h1>
          Ja<span>mmm</span>ing
        </h1>
      </div>
      <button className="login-button" onClick={getToken}>
        Login
      </button>
      <SearchBar onSearch={search} />
      <main className="main-lists">
        <SearchResults
          searchResults={searchResults}
          handleSelectTracks={handleSelectTracks}
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
