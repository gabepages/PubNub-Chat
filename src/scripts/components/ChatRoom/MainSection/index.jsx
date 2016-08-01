import React from "react";


export default class MainSection extends React.Component {
  render() {
    return (
      <div className="main">
        <MessageSection />
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
