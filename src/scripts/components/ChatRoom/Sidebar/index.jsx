import React from "react";


export default class Sidebar extends React.Component {

 render() {
   let users = this.props.users.map(function(user){
     var date = new Date(user.timestamp);
     var h = date.getHours();
     var m = date.getMinutes();
     function adjustHour(h){
       if(h<=12){
         return h
       }else{
         return h - 13
       }
     }
     var newHour = adjustHour(h);
     if(user.action == "join"){
       return(
         <li key={user.timestamp}>
           <img src='src/images/profile.jpg'/>
           <h3>{user.uuid}</h3>
           <p>joined at {newHour}:{m}</p>
         </li>
       )
     }
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
