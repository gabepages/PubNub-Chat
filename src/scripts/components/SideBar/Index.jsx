import React from "react";

//local file Imports
import SideBarHeader from "./SideBarHeader.jsx"
import ActiveUsers from "./ActiveUsers.jsx"


export default class SideBar extends React.Component {
 render() {
  return (
    <div className="side-bar">
      <SideBarHeader />
      <ActiveUsers />
    </div>
  );
 }

}
