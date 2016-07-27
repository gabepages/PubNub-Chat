import React from "react";


export default class InputSection extends React.Component {
 render() {
  return (
    <div className="input-section">
      <form action="">
        <input id="text-input" type="text" placeholder="Hello World." />
        <input id="submit-button" type="submit" />
      </form>
    </div>
  );
 }

}
