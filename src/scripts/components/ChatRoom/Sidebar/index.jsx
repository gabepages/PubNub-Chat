import React from "react";


export default class Sidebar extends React.Component {
  render() {
    let users = this.props.users.map(function(user){
       return(
         <li key={user}>
           <img src='src/images/profile.jpg'/>
           <h3>{user}</h3>
         </li>
       )
    });
    return (
      <div className="side-bar">
        <div className="header">
          <h1>Suncoast Chat</h1>
          <h2>with <a href='https://www.pubnub.com/'>PubNub</a></h2>
        </div>
        <div className="active-users">
          <h2>Users</h2>
          <ul>
            {users}
          </ul>
        </div>
      </div>
    );
  }
}
