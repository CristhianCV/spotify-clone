import React, { useState, useEffect } from "react";
import "./Footer.css";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutline from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownOutlinedIcon from "@material-ui/icons/VolumeDownOutlined";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import VolumeOffOutlinedIcon from "@material-ui/icons/VolumeOffOutlined";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import BrandingWatermarkOutlinedIcon from "@material-ui/icons/BrandingWatermarkOutlined";
import DevicesIcon from "@material-ui/icons/Devices";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import MicNoneIcon from "@material-ui/icons/MicNone";

import { Grid, Slider } from "@material-ui/core";
import { useDataLayerValue } from "../../context/DataLayer";

function Footer() {
  const [
    { current_playlist, current_track, current_audio, is_playing },
    dispatch,
  ] = useDataLayerValue();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [volume, setVolume] = useState(100);

  const setIsPlayingAudio = (isPlayingAudio) => {
    dispatch({
      type: "SET_IS_PLAYING",
      is_playing: isPlayingAudio,
    });
  };

  const playCurrentAudio = (isPlayingAudio) => {
    current_audio
      .play()
      .then((response) => {
        setIsPlayingAudio(isPlayingAudio);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickPlayTrackHandler = () => {
    if (is_playing) {
      current_audio.pause();
      setIsPlayingAudio(false);
    } else {
      playCurrentAudio(true);
    }
  };

  const onChangePlaybackHandler = (event, newValue) => {
    setElapsedTime(newValue);
    current_audio.currentTime = newValue;
  };

  const onChangeVolumeHandler = (event, newValue) => {
    setVolume(newValue);
    current_audio.volume = newValue / 100;
  };

  const onClickPreviousHandler = () => {
    const index = current_playlist.tracks.items.findIndex(
      (element) => element.track.id === current_track.id
    );

    if (index === 0) return;

    const newTrack = current_playlist.tracks.items[index - 1];

    current_audio.pause();
    dispatch({
      type: "SET_CURRENT_TRACK",
      current_track: newTrack.track,
    });
    dispatch({
      type: "SET_CURRENT_AUDIO",
      current_audio: newTrack.track.preview_url
        ? new Audio(newTrack.track.preview_url)
        : new Audio(),
    });
  };

  const onClickNextHandler = () => {
    const index = current_playlist.tracks.items.findIndex(
      (element) => element.track.id === current_track.id
    );
    const newTrack =
      current_playlist.tracks.items[
        index === current_playlist.tracks.total - 1 ? 0 : index + 1
      ];

    current_audio.pause();
    dispatch({
      type: "SET_CURRENT_TRACK",
      current_track: newTrack.track,
    });
    dispatch({
      type: "SET_CURRENT_AUDIO",
      current_audio: newTrack.track.preview_url
        ? new Audio(newTrack.track.preview_url)
        : new Audio(),
    });
  };

  useEffect(() => {
    const tick = (e) => {
      setElapsedTime(e.target.currentTime);
      if (e.target.currentTime === e.target.duration) {
        current_audio.pause();
        setIsPlayingAudio(false);
      }
    };

    if (
      current_audio &&
      current_audio.src !== "" &&
      !current_audio.ontimeupdate
    ) {
      current_audio.ontimeupdate = tick;
      playCurrentAudio(true);
      current_audio.volume = volume / 100;

      return () => {
        current_audio.ontimeupdate = null;
      };
    } else {
      setElapsedTime(0);
      setIsPlayingAudio(false);
    }
  }, [current_audio]);

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          src={current_track?.album.images[0]?.url}
          alt="Album Logo"
          className="footer__albumLogo"
        />
        <div className="footer__songInfo">
          <h4>{current_track?.name}</h4>
          <p>{current_track?.artists.map((artist) => artist.name).join(",")}</p>
        </div>
        <FavoriteBorder
          fontSize="small"
          className="footer__icon"
        ></FavoriteBorder>
        <BrandingWatermarkOutlinedIcon
          fontSize="small"
          className="footer__icon"
        ></BrandingWatermarkOutlinedIcon>
      </div>
      <div className="footer__center">
        <div className="footer__controls">
          <ShuffleIcon fontSize="small" className="footer__icon"></ShuffleIcon>
          <SkipPreviousIcon
            fontSize="small"
            onClick={onClickPreviousHandler}
            className="footer__icon"
          ></SkipPreviousIcon>
          {is_playing ? (
            <PauseCircleOutline
              fontSize="large"
              className="footer__iconScale"
              onClick={onClickPlayTrackHandler}
            ></PauseCircleOutline>
          ) : (
            <PlayCircleOutlineIcon
              fontSize="large"
              className="footer__iconScale"
              onClick={onClickPlayTrackHandler}
            ></PlayCircleOutlineIcon>
          )}
          <SkipNextIcon
            fontSize="small"
            onClick={onClickNextHandler}
            className="footer__icon"
          ></SkipNextIcon>
          <RepeatIcon fontSize="small" className="footer__icon"></RepeatIcon>
        </div>
        <div className="footer__playback">
          <Grid container spacing={2}>
            <Grid item>
              <span>{`0:${elapsedTime < 10 ? "0" : ""}${parseInt(
                elapsedTime
              )}`}</span>
            </Grid>
            <Grid item xs>
              <Slider
                onChange={onChangePlaybackHandler}
                value={parseInt(elapsedTime)}
                min={0}
                max={30}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <span>
                {current_audio && current_audio.duration
                  ? `0:${current_audio.duration < 10 ? "0" : ""}${parseInt(
                      current_audio.duration
                    )}`
                  : "0:00"}
              </span>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="footer__right">
        <MicNoneIcon fontSize="small" className="footer__icon"></MicNoneIcon>
        <PlaylistPlayIcon
          fontSize="small"
          className="footer__icon"
        ></PlaylistPlayIcon>
        <DevicesIcon fontSize="small" className="footer__icon"></DevicesIcon>
        {volume === 0 ? (
          <VolumeOffOutlinedIcon
            fontSize="small"
            className="footer__icon"
          ></VolumeOffOutlinedIcon>
        ) : volume > 50 ? (
          <VolumeUpOutlinedIcon
            fontSize="small"
            className="footer__icon"
          ></VolumeUpOutlinedIcon>
        ) : (
          <VolumeDownOutlinedIcon
            fontSize="small"
            className="footer__icon"
          ></VolumeDownOutlinedIcon>
        )}
        <Slider
          min={0}
          max={100}
          value={volume}
          onChange={onChangeVolumeHandler}
        ></Slider>
      </div>
    </div>
  );
}

export default Footer;
