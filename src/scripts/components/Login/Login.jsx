import React from "react"


export default class Login extends React.Component {

  changeStatus(e){
    e.preventDefault();
    const username = document.getElementById('username').value;
    document.getElementById('username').setAttribute("value", "");
    this.props.changeStatus(username);
  }

 render() {
  return (
    <div className='login'>
      <h1>Suncoast Chat with <a href='pubnub.com'>PubNub</a></h1>
      <h2>Login</h2>
      <form onSubmit={this.changeStatus.bind(this)}>
        <input id='username' type='text' placeholder='ex.developer123'/>
      </form>
    </div>
  );
 }

}
