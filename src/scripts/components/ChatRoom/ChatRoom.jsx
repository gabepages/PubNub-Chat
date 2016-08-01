import React from "react"

//local file imports
import Sidebar from "./Sidebar"
import MainSection from "./MainSection"


export default class ChatRoom extends React.Component {

  render() {
    return (
      <div id='container'>
        <Sidebar />
        <MainSection />
      </div>
    )
  }
}
