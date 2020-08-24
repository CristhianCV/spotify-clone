import React from "react";
import "./SidebarOption.css";

function SidebarOption({ title, Icon }) {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon"></Icon>}
      <p>{title}</p>
    </div>
  );
}

export default SidebarOption;
