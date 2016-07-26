import React from "react";


export default class SideBarHeader extends React.Component {
 render() {
  return (
      <div className="header">
        <h1>Suncoast Chat</h1>
        <h2>with <a href='https://www.pubnub.com/'>PubNub</a></h2>
      </div>
  );
 }

}
