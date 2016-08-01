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
      subscribe_key: 'sub-c-e1c8464a-54f6-11e6-b182-02ee2ddab7fe',
      publish_key: 'pub-c-1a91a807-a7f6-4bf2-9bb4-9d8936226301',
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
      restore: true,
      connect: () => this.fetchOldMessages(),
      message: (m) => this.recieveNewMessages(m),
      presence: (u) => this.updatePresence(u)
    });
  }
  updatePresence(u){
    const users = this.state.users
    if (u.action == "join"){
      let newUsers = users.concat(u.uuid)
      this.setState({
        users: newUsers
      })
    }else{
      let newUsers = this.removeUser(users, u.uuid)
      this.setState({
        users: newUsers
      })
    }
  }
  removeUser(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
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
    this.setState({
      messages: messages
    });
  }

  sendMessage (message) {
    const pubnub = this.state.pubnub;
    const username = pubnub.get_uuid()
    let date = new Date();
    const messageData = {
      text: message,
      username: username,
      date: date
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
