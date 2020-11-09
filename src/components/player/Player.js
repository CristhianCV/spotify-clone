import React from "react";
import "./Player.css";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";

function Player({ spotify }) {
  return (
    <div className="player">
      <Sidebar></Sidebar>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default Player;
