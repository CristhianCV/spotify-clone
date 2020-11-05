import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/auth/Login";
import { getTokenFromUrl } from "./config/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/player/Player";
import { useDataLayerValue } from "./context/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
      spotify.getPlaylist("37i9dQZF1DXbOVU4mpMJjh").then((response) => {
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          current_playlist: response,
        });

        const defaultTrack = response.tracks.items.find(
          (element) =>
            element.track.preview_url && element.track.preview_url !== ""
        );

        spotify.getTrack(defaultTrack.track.id).then((track) => {
          dispatch({
            type: "SET_CURRENT_TRACK",
            current_track: track,
          });
          dispatch({
            type: "SET_CURRENT_AUDIO",
            current_audio: new Audio(track.preview_url),
          });
        });
      });
    }
  }, []);

  return (
    <div className="App">
      {token ? <Player spotify={spotify}></Player> : <Login></Login>}
    </div>
  );
}

export default App;
