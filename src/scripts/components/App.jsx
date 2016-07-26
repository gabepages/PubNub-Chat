import React from "react"

//local file imports
import SideBar from "./SideBar/Index.jsx"
import MainSection from "./MainSection/Index.jsx"


export default class App extends React.Component {
 render() {
  return (
    <div id='container'>
      <SideBar />
      <MainSection />
    </div>
  );
 }

}
