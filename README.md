# PubNub-Chat

##Setup
####If you dont have webpack installed already, run this command:

```sh
npm install webpack -g
```

##Getting Started
### After you've installed webpack globally, run the following commands:

```sh
git clone git@github.com:gabepages/PubNub-Chat.git
```

```sh
cd PubNub-Chat
```

```sh
npm install
```

####To run the webpack watch, run this command:

```sh
webpack -w
```

##Step 1: Initialize PubNub
#### You must include the PubNub JavaScript SDK in your code before initializing the client.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PubNub-Chat</title>
</head>
<body>

  <div id="app"></div>

  <script src="http://cdn.pubnub.com/pubnub-3.15.2.min.js"></script>
  <script src="bundle.js"></script>
</body>
</html>
```

#### Now you can initialize PubNub in  `src/scripts/components/ChatRoom/ChatRoom.jsx`.

```js
import React from "react"

//local file imports
import Sidebar from "./Sidebar"
import MainSection from "./MainSection"


export default class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pubnub: undefined
    };
  }
  componentWillMount(){

    //Get uuid from login page
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
  render() {
    return (
      <div id='container'>
        <Sidebar />
        <MainSection />
      </div>
    )
  }
}
```

##Step 2: Subscribe to a channel
#### Add PubNubs, `subscribe()` block to listen on a channel, along with the `history()` block to fetch the previous messages in that channel in `src/scripts/components/ChatRoom/ChatRoom.jsx`.

```js
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

    //Get uuid from login page
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
    })
    this.scrollToBottom()
  }
  recieveNewMessages(m){
    let messages = this.state.messages
    if(messages.length > 0){
      messages[0].push(m)
      this.setState({
        messages: messages
      })
      this.scrollToBottom()
    }
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
  scrollToBottom(){
    const scrollSection = document.querySelector('.message-section')
    scrollSection.scrollTop = scrollSection.scrollHeight
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
        />
      </div>
    )
  }
}
```
#### Now we want to edit `src/scripts/components/ChatRoom/Sidebar/index.jsx` so that we can populate the active users sidebar.

```js
import React from "react";

export default class Sidebar extends React.Component {
  render() {
    //map through users to populate active user sidebar
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
```

####  We also want to edit `src/scripts/components/ChatRoom/MainSection/index.jsx` so that we can populate the messages section.

```js
import React from "react";


export default class MainSection extends React.Component {
  render() {
    return (
      <div className="main">
        <MessageSection
          messages={this.props.messages}
          pubnub={this.props.pubnub}
         />
        <InputSection />
      </div>
    )
  }
}

/*****************
MessageSection Component
************************/

class MessageSection extends React.Component {
  render() {
    if(this.props.messages.length > 0){
      let messageList = this.props.messages[0]

      //map over array of messages
      let messages = messageList.map(function(message){
        // Get current user
        let user = this.props.pubnub.get_uuid()

        //check if message is from current user
        if(user == message.username){
          return(
            <div className='messageSent' key={message.date} >
              <h3>{message.text}</h3>
            </div>
          )
        }else {
          return(
            <div className="messageRecieved" key={message.date}>
              <p>{message.username}</p>
              <h3>{message.text}</h3>
            </div>
          )
        }
      }.bind(this));
      return(
        <div className="message-section">
          {messages}
        </div>
      )
    }
    return(
      <div className="message-section"></div>
    )
  }
}

/*****************
InputSection Component
************************/

class InputSection extends React.Component {
  render() {
    return (
      <div className="input-section">
        <form>
          <input id="text-input" type="text" placeholder="Hello World." />
          <input id="submit-button" type="submit" />
        </form>
      </div>
    )
  }
}
```

####By now we should be able to see messages that were prevously posted in the channel we are subscribed to, as well as view active users.

##Step 3: Publish to a channel
