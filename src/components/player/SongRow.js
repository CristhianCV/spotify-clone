import React from "react";
import "./SongRow.scss";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import PlayArrow from "@material-ui/icons/PlayArrow";
import VolumeUp from "@material-ui/icons/VolumeUp";
import Pause from "@material-ui/icons/Pause";
import { useDataLayerValue } from "../../context/DataLayer";

function SongRow({ track = "test" }) {
  const [
    { current_track, current_audio, is_playing },
    dispatch,
  ] = useDataLayerValue();

  const onClickPlayHandle = () => {
    current_audio.pause();
    dispatch({
      type: "SET_CURRENT_TRACK",
      current_track: track,
    });
    dispatch({
      type: "SET_CURRENT_AUDIO",
      current_audio: track.preview_url
        ? new Audio(track.preview_url)
        : new Audio(),
    });
  };

  let icons;
  if (track.id === current_track.id && is_playing) {
    icons = (
      <>
        <VolumeUp className="songRow__icon"></VolumeUp>
        <Pause className="songRow__iconHover"></Pause>
      </>
    );
  } else {
    icons = (
      <>
        <MusicNoteOutlinedIcon className="songRow__icon"></MusicNoteOutlinedIcon>
        <PlayArrow className="songRow__iconHover"></PlayArrow>
      </>
    );
  }

  return (
    <div
      className={`songRow ${
        track.id === current_track.id ? "songRow__selected" : ""
      }`}
      onClick={onClickPlayHandle}
    >
      {icons}
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(",")} •{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
