import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: ""
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: ""
    };
  }

  onInputChange = event => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onInputSubmit = event => {
    this.setState({ imgUrl: this.state.input });
    console.log("click");
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response);
      },
      function(error) {
        console.log("ERROR:");
        console.log(error);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onInputSubmit={this.onInputSubmit}
        />
        <FaceRecognition imgUrl={this.state.imgUrl} />
      </div>
    );
  }
}

export default App;
