import React, { Component } from "react";
// import { observable, action } from "mobx";
import { observer } from "mobx-react";
import SocialButton from "./SocialButton"
import Terminal from "./Terminal"

@observer
class App extends Component {
  render() {
    return (
      <div id="sb-pane">
        <div id="sb">Samuel BENAIS</div>
        <div id="sb-title">IT Engineer</div>
        <Terminal />
        <div id="sb-social">
          <SocialButton link="https://github.com/Samb102" id="github" />
          <SocialButton link="https://stackoverflow.com/users/7757590/samb102" id="stack-overflow" />
          <SocialButton link="https://fr.linkedin.com/in/samuel-benaïs-bb1018a5" id="linkedin" />
        </div>
      </div>
    );
  }

  // @action
  // handleInputChange = e => {
  //   this.newTodoTitle = e.target.value;
  // };

  // @action
  // handleFormSubmit = e => {
  //   this.props.store.addTodo(this.newTodoTitle);
  //   this.newTodoTitle = "";
  //   e.preventDefault();
  // };
}

export default App;
