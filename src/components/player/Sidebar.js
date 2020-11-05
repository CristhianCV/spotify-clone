import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import LibraryMusicOutlined from "@material-ui/icons/LibraryMusicOutlined";
import { useDataLayerValue } from "../../context/DataLayer";
import logo from "../../assets/images/logo.jpg";

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={logo} alt="logo"></img>
      <SidebarOption Icon={HomeOutlined} title="Home"></SidebarOption>
      <SidebarOption Icon={SearchOutlined} title="Search"></SidebarOption>
      <SidebarOption
        Icon={LibraryMusicOutlined}
        title="Your Library"
      ></SidebarOption>
      <div className="sidebar__playlists">
        <h1 className="sidebar__title">PLAYLISTS</h1>
        <hr></hr>
        {playlists?.items?.map((playlist) => (
          <SidebarOption
            key={playlist.id}
            title={playlist.name}
          ></SidebarOption>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
