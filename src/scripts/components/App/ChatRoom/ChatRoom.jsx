import React from "react"

//local file imports
import Sidebar from "./SideBar/Sidebar.jsx"
import MainSection from "./MainSection/MainSection.jsx"


export default class ChatRoom extends React.Component {
componentWillMount(){

  const uuid = this.props.uuid;

  // Initialize PubNub instance with personal UUID
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
