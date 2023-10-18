const client_id = "deb4892109124216b877ceb58f234eb8"; // Replace with your client ID
const redirect_uri = "http://localhost:3000/";
const scope =
  "playlist-modify-public user-modify-playback-state user-read-playback-state";

let accessUrl = `https://accounts.spotify.com/authorize`;
accessUrl += "?response_type=token";
accessUrl += "&client_id=" + encodeURIComponent(client_id);
accessUrl += "&scope=" + encodeURIComponent(scope);
accessUrl += "&redirect_uri=" + encodeURIComponent(redirect_uri);

let token;
export function getToken() {
  if (token) {
    return token;
  } else if (window.location.hash.length > 1) {
    const hashParameters = {};

    window.location.hash
      .slice(1)
      .split("&")
      .forEach((item) => {
        const parameter = item.split("=");
        hashParameters[parameter[0]] = parameter[1];
      });

    token = hashParameters.access_token;
    window.history.pushState("Access Token", "", "/");
    return token;
  } else if (!token) {
    window.location = accessUrl;
  }
}

export function getSongs(term, page) {
  const token = getToken();

  return fetch(
    `https://api.spotify.com/v1/search?type=track&q=${term}&offset=${
      (page - 1) * 20
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map((track, index) => ({
        position: index,
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        isPlay: false,
      }));
    });
}

export function createPlaylist(playlistName, trackUri) {
  if (!playlistName || !trackUri.length) {
    return;
  }

  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };
  let userId;

  return fetch("https://api.spotify.com/v1/me", { headers: headers })
    .then((response) => response.json())
    .then((jsonResponse) => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: playlistName }),
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          const playlistId = jsonResponse.id;
          return fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ uris: trackUri }),
            }
          );
        });
    });
}

export function playTrack(trackUri) {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  return fetch("https://api.spotify.com/v1/me", {
    headers: headers,
    "Content-Type": "application/json",
  })
    .then(() => {
      return fetch(`https://api.spotify.com/v1/me/player/devices`, {
        headers: headers,
      });
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      const deviceId = jsonResponse.devices[0]?.id;
      if (!deviceId) {
        alert("You should open Spotify App first if you are trying to listen.");
        return
      }
      return fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          headers: headers,
          method: "PUT",
          body: JSON.stringify({ uris: [trackUri] }),
        }
      );
    });
}

export function pauseTrack(trackUri) {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  return fetch("https://api.spotify.com/v1/me", {
    headers: headers,
    "Content-Type": "application/json",
  })
    .then(() => {
      return fetch(`https://api.spotify.com/v1/me/player/devices`, {
        headers: headers,
      });
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      const deviceId = jsonResponse.devices[0]?.id;
      if (!deviceId) {
        return;
      }
      return fetch(
        `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
        {
          headers: headers,
          method: "PUT",
          body: JSON.stringify({ uris: [trackUri] }),
        }
      );
    });
}
