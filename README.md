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
 <script src="http://cdn.pubnub.com/pubnub-3.15.2.min.js"></script>
```

#### Now you can initialize PubNub in  `src/scripts/components/ChatRoom/ChatRoom.jsx`.

```js
import React from "react"

//local file imports
import Sidebar from "./SideBar/Sidebar.jsx"
import MainSection from "./MainSection/MainSection.jsx"


export default class ChatRoom extends React.Component {
componentWillMount(){

  const uuid = this.props.uuid;
  console.log(uuid);

  // Initialize PubNub instance with personal UUID from login page
  const pubnub = PUBNUB({
    subscribe_key: 'pub-c-3dd6d969-eaef-4b1d-a3df-796e4240ec1e',
    publish_key: 'sub-c-01fea1f4-4d1b-11e6-9c7c-0619f8945a4f',
    uuid: uuid
  });

}
 render() {
  return (
    <div id='container'>
      <Sidebar />
      <MainSection />
    </div>
  );
 }

}
```
