import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "../../context/DataLayer";

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon></SearchIcon>
        <input
          placeholder="Search for artists, songs, or podcasts"
          type="text"
        ></input>
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt="User Avatar"></Avatar>
        <h5>{user?.display_name}</h5>
      </div>
    </div>
  );
}

export default Header;
