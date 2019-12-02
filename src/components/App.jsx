import React, { Component } from "react";
import Particles from 'react-particles-js';
import { particlesConfig, particlesStyle } from '../styles/particles.js'

import SocialButton from "./SocialButton"
import PGP from './PGP'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isMobile: this.isMobile() }
  }

  isMobile() {
    try { document.createEvent("TouchEvent"); return true; }
    catch (e) { return false; }
  }

  render() {
    return (
      <div>
        {!this.state.isMobile && <Particles
          params={particlesConfig}
          style={particlesStyle} />}
        <div id="sb-pane">
          <div id="sb">Samuel BENAIS</div>
          <div id="sb-title">IT Engineer</div>
          <div id="sb-social">
            <SocialButton link="https://github.com/Samb102" id="github" />
            <SocialButton link="https://stackoverflow.com/users/7757590/samb102" id="stack-overflow" />
            <SocialButton link="https://fr.linkedin.com/in/samuel-benaïs-bb1018a5" id="linkedin" />
            <SocialButton link="https://www.root-me.org/Samb101" id="root-me" />
          </div>
          <PGP />
        </div>
      </div>
    );
  }
}

export default App;
