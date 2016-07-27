import React from "react"



export default class Login extends React.Component {
  setUsername(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    document.getElementById('username').setAttribute("value", "");
    this.props.changeStatus(username);
  }
 render() {
  return (
    <div className='login'>
      <h1>Suncoast Chat with <a href='https://www.pubnub.com/'>PubNub</a></h1>
      <h2>Login</h2>
      <form onSubmit={this.setUsername.bind(this)}>
        <input id='username' type="text" placeholder='developer123'/>
      </form>
    </div>
  );
 }

}
