import React from "react";
import "./SongRow.scss";
import MusicNoteOutlinedIcon from "@material-ui/icons/MusicNoteOutlined";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDataLayerValue } from "../../context/DataLayer";
import EqualizerIcon from "../../assets/images/equalizer.gif";

function SongRow({ track = "test", index }) {
  const [
    { current_track, current_audio, is_playing },
    dispatch,
  ] = useDataLayerValue();

  const minutes = Math.floor(track.duration_ms / 1000 / 60);
  const seconds = Math.floor((track.duration_ms / 1000) % 60);

  const onClickPlayHandle = () => {
    if (track.id === current_track?.id) {
      current_audio
        .play()
        .then((response) => {
          dispatch({
            type: "SET_IS_PLAYING",
            is_playing: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
    }
  };

  const onClickPauseHandle = () => {
    current_audio.pause();
    dispatch({
      type: "SET_IS_PLAYING",
      is_playing: false,
    });
  };

  let icons;
  if (track.id === current_track?.id && is_playing) {
    icons = (
      <>
        <img
          src={EqualizerIcon}
          alt="Playing Icon"
          className="songRow__icon"
        ></img>
        <Pause
          className="songRow__iconHover"
          onClick={onClickPauseHandle}
        ></Pause>
      </>
    );
  } else {
    icons = (
      <>
        <span className="songRow__icon">{index + 1}</span>
        <PlayArrow
          className="songRow__iconHover"
          onClick={onClickPlayHandle}
        ></PlayArrow>
      </>
    );
  }

  return (
    <div
      className={`songRow ${
        track.id === current_track?.id ? "songRow__selected" : ""
      }`}
    >
      <div>{icons}</div>
      <div className="songRow__info">
        <img src={track.album.images[0]?.url} alt="Album Logo"></img>
        <div>
          <h1>{track.name}</h1>
          <p>{track.artists.map((artist) => artist.name).join(",")}</p>
        </div>
      </div>
      <div>
        <p>{track.album.name}</p>
      </div>
      <div className="songRow__added">
        <span>5 de noviembre de 2020</span>
      </div>
      <div className="songRow__options">
        <FavoriteBorder fontSize="small"></FavoriteBorder>
        <p>
          {minutes}:{`${seconds < 10 ? "0" : ""}${seconds}`}
        </p>
        <MoreHorizIcon fontSize="small"></MoreHorizIcon>
      </div>
    </div>
  );
}

export default SongRow;
