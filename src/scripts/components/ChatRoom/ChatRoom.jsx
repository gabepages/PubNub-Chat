import React from "react"

//local file imports
import Sidebar from "./SideBar/Sidebar.jsx"
import MainSection from "./MainSection/MainSection.jsx"


export default class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pubnub: undefined,
      messages: []
    };
  }
componentWillMount(){

  const uuid = this.props.uuid;

  // Initialize PubNub instance with personal UUID from login page
  const pubnub = PUBNUB({
    subscribe_key: 'sub-c-426f2002-53b9-11e6-a5a4-0619f8945a4f',
    publish_key: 'pub-c-a5512859-880e-471c-91ff-365d2bf1b694',
    uuid: uuid
  });


  this.setState({pubnub: pubnub});
}
 render() {
  return (
    <div id='container'>
      <Sidebar pubnub={this.state.pubnub} />
      <MainSection pubnub={this.state.pubnub} />
    </div>
  );
 }

}
