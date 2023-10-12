import './App.css';
import React, {useState, useCallback} from 'react';
import {getSongs, createPlaylist} from './util/Spotify'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [playlistName, setPlaylistName] = useState("New Playlist")
  
  const search = useCallback((searchTerm) => {
    getSongs(searchTerm).then(setSearchResults);
  },[])
  

  function handleSelectSongs(id) {
    const selectedSong = searchResults.find(song => song.id === id);
    if (selectedSong) {
      if (!playlistTracks.some(track => track.id === selectedSong.id)) {
        setPlaylistTracks(prev => [...prev, selectedSong]);
      } else {
        setPlaylistTracks(prev => prev.filter(track => track.id !== selectedSong.id));
      }
    }
  }

  const handleNameChange = useCallback(
    playlistName => {
      setPlaylistName(playlistName)
    }
  )
  
  const handleCreatePlaylist = useCallback(
    () => {
      const trackUri = playlistTracks.map((track) => track.uri)
      createPlaylist(playlistName, trackUri).then(() => {
        setPlaylistName("New Playlist")
        setPlaylistTracks([])
      })
    }
  )



  return (
    <div>
      <div className="heading">
        <h1>Ja<span>mmm</span>ing</h1>
      </div>
      <SearchBar onSearch={search}/>
      <main className="main-lists">
        <SearchResults searchResults={searchResults} handleSelectSongs={handleSelectSongs}/>
        <Playlist 
          playlistTracks={playlistTracks} 
          handleSelectSongs={handleSelectSongs} 
          playlistName={playlistName}
          handleNameChange ={handleNameChange}
          onCreate = {handleCreatePlaylist}
        />
      </main>
    </div>
  );
}

export default App;
