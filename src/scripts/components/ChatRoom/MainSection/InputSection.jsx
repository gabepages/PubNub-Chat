import React from "react";


export default class InputSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {pubnub: this.props.pubnub};
  }
  sendMessage(e){
    e.preventDefault()
    const pubnub = this.state.pubnub;

    let message = document.getElementById('text-input').value;
    document.getElementById('text-input').value = null;

    pubnub.publish({
      channel : 'suncoast-chat',
      message : message,
      callback: function(m){
          console.log("callback from publish: ", m);
      },
      error: function(e){
        console.log(e);
      }
    });
  }
 render() {
  return (
    <div className="input-section">
      <form onSubmit={this.sendMessage.bind(this)}>
        <input id="text-input" type="text" placeholder="Hello World." />
        <input id="submit-button" type="submit" />
      </form>
    </div>
  );
 }

}
