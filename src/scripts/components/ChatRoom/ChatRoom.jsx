import React from "react"

//local file imports
import Sidebar from "./Sidebar"
import MainSection from "./MainSection"


export default class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pubnub: undefined,
      messages: [],
      users: []
    };
  }

  componentWillMount(){

    const uuid = this.props.uuid;

    // Initialize PubNub instance with personal UUID from login page
    const pubnub = PUBNUB({
      subscribe_key: 'sub-c-86d1dc06-5424-11e6-bd9c-0619f8945a4f',
      publish_key: 'pub-c-44188f9d-c750-4a9b-bae8-f2000732138a',
      uuid: uuid
    });

    //set pubnub state to be used throughout component
    this.setState({pubnub: pubnub});
  }

  componentDidMount(){
    const pubnub = this.state.pubnub;

    // subscribe to "suncoast-chat" channel
    pubnub.subscribe({
      channel: 'suncoast-chat',
      presence : (u) => this.updatePresence(u),
      restore: true,
      connect: () => this.fetchOldMessages(),
      message: (m) => this.recieveNewMessages(m)
    });
  }
  updatePresence(u){
    const users = this.state.users;
    let newUserList = users.concat(u);
    this.setState({
      users: newUserList
    });
  }
  fetchOldMessages(){
   const pubnub = this.state.pubnub;
   let messages = this.state.messages;
   //fetch message history
   pubnub.history({
     channel: 'suncoast-chat',
     count: 25,
     callback: (m) => {
       let newMessages = messages.concat(m);
       this.setState({
         messages: newMessages
       });
     }
   });
  }

  recieveNewMessages(m){
    let messages = this.state.messages;
    messages[0].push(m);
    console.log("updated messages: ", messages);
    this.setState({
      messages: messages
    });
  }

  sendMessage (message) {
    const pubnub = this.state.pubnub;
    const username = pubnub.get_uuid()
    const messageData = {
      text: message,
      username: username
    };
    // publish(send) message to channel
    pubnub.publish({
     channel : 'suncoast-chat',
     message : messageData,
     callback: function(m){
       console.log('message sent.');
     },
     error: function(e){
       console.log(e);
     }
    });
  }

  render() {

    return (
      <div id='container'>
        <Sidebar
          users={this.state.users}
        />
        <MainSection
          messages={this.state.messages}
          pubnub={this.state.pubnub}
          sendMessage={this.sendMessage.bind(this)}
        />
      </div>
    );
  }

}
