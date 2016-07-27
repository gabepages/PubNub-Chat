import React from "react"

//local file imports
import Sidebar from "./SideBar/Sidebar.jsx"
import MainSection from "./MainSection/MainSection.jsx"


export default class ChatRoom extends React.Component {

 render() {
  return (
    <div id='container'>
      <Sidebar />
      <MainSection />
    </div>
  );
 }

}
