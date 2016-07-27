import React from "react";

//local file imports
import MessageSection from "./MessageSection.jsx"
import InputSection from "./InputSection.jsx"


export default class MainSection extends React.Component {
constructor(props){
  super(props);
  this.state = {
    pubnub: this.props.pubnub,
  };

}
componentDidMount() {
  const pubnub = this.state.pubnub;
  pubnub.subscribe({
    channel: 'suncoast-chat',
    restore: true,
    connect: () => this.fetchOldMessages(),
    message: (m) => this.recieveNewMessages(m)
  });
}
fetchOldMessages(){
  const pubnub = this.state.pubnub;
  pubnub.history({
    channel: 'suncoast-chat',
    count: 25,
    callback: (m) => {
      console.log("callback from history: " + m);
    }
  });
}
recieveNewMessages(m){
  console.log("New Message: " + m);
}
 render() {
  return (
    <div className="main">
      <MessageSection />
      <InputSection pubnub={this.state.pubnub} />
    </div>
  );
 }

}
