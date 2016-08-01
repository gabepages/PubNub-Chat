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
