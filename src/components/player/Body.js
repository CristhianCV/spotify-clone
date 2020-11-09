import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "../../context/DataLayer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ current_playlist }, dispatch] = useDataLayerValue();
  return (
    <div className="body">
      <Header></Header>
      <div className="body__info">
        <img src={current_playlist?.images[0].url} alt="¨Playlist Logo" />
        <div className="body__infoText">
          <strong>{current_playlist?.type}</strong>
          <h2>{current_playlist?.name}</h2>
          <p>{current_playlist?.description}</p>
          <div className="body__infoDetails">
            <strong>{current_playlist?.owner.display_name}</strong>
            <span>•</span>
            <span>{current_playlist?.followers.total} likes</span>
            <span>•</span>
            <span>{current_playlist?.tracks.total} songs</span>
          </div>
        </div>
      </div>

      <div className="body__song">
        <div className="body__songBackground"></div>
        <div className="body__icons">
          <PlayCircleFilledIcon className="body__shuffle"></PlayCircleFilledIcon>
          <FavoriteBorder fontSize="large"></FavoriteBorder>
          <MoreHorizIcon></MoreHorizIcon>
        </div>
        <div className="body__list">
          <div className="body__listHeader">
            <div>
              <span>#</span>
            </div>
            <div>
              <span>TÍTULO</span>
            </div>
            <div>
              <span>ÁLBUM</span>
            </div>
            <div>
              <span>AGREGADO EL</span>
            </div>
            <div>
              <ScheduleIcon></ScheduleIcon>
            </div>
          </div>
          {current_playlist?.tracks.items.map((item, index) => (
            <SongRow
              key={item.track.id}
              track={item.track}
              index={index}
            ></SongRow>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
