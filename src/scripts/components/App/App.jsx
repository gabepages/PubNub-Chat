import React from "react"

//local file imports
import Login from './Login/Login.jsx'
import ChatRoom from './ChatRoom/ChatRoom.jsx'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      status: "login",
      uuid: ""
    };
    this.changeStatus = this.changeStatus.bind(this);
  }
  changeStatus(name){
    this.setState({
      uuid: name,
      status: 'chatroom'
    });
  }
 render() {
  if(this.state.status == 'login'){
    return (<Login changeStatus={this.changeStatus} />);
  }
  return (<ChatRoom uuid={this.state.uuid} />);
 }

}
