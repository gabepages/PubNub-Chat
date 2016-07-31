import React from "react";



export default class MainSection extends React.Component {
  render() {
    return (
      <div className="main">
        <MessageSection
          messages={this.props.messages}
          pubnub={this.props.pubnub}
         />
        <InputSection sendMessage={this.props.sendMessage}/>
      </div>
    );
  }

}


/*****************
MessageSection Component
************************/

class MessageSection extends React.Component {
  render() {

    if(this.props.messages.length > 0){
      let messageList = this.props.messages[0];

      //map over array of messages
      let messages = messageList.map(function(message){

        // Get current user
        let user = this.props.pubnub.get_uuid();
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
      <div className="message-section">

      </div>
    )
  }
}


/*****************
InputSection Component
************************/

class InputSection extends React.Component {
  sendMessage(e){
    e.preventDefault()
    let message = document.getElementById('text-input').value;
    document.getElementById('text-input').value = null;
    this.props.sendMessage(message);
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
