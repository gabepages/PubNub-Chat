import React from "react";

//local file imports
import MessageSection from "./MessageSection.jsx"
import InputSection from "./InputSection.jsx"


export default class MainSection extends React.Component {
 render() {
  return (
    <div className="main">
      <MessageSection />
      <InputSection />
    </div>
  );
 }
}
