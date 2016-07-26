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
### You must include the PubNub JavaScript SDK in your code before initializing the client.

```html
 <script src="http://cdn.pubnub.com/pubnub-3.15.2.min.js"></script>
```

### Now you can initialize PubNub in  `src/scripts/index.js`.

```js
//NPM Imports
import React from 'react';
import { render } from "react-dom";

//Styles
import '../styles/app.scss';

//Local File Imports
import App from './components/App.jsx';


//Initialize PubNub instance
const pubnub = PUBNUB({
        publish_key : 'pub-c-3dd6d969-eaef-4b1d-a3df-796e4240ec1e',
        subscribe_key : 'sub-c-01fea1f4-4d1b-11e6-9c7c-0619f8945a4f'
    });

render(
  <App pubnub={pubnub} />,
  document.getElementById('app')
);
```
