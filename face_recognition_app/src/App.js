import React from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Signin from "./components/SingnIn/SignIn";
import Register from "./components/register/register";

const app = new Clarifai.App({
  apiKey: "45230abbdd634094946ed2d90c35a323"
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: new Date()
      }
    };
  }

  loadUsers = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: 0,
        joined: new Date()
      }
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFacebox = box => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = event => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onInputSubmit = event => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(response => response.json())
            .then(count => {
              this.setState({
                user: { ...this.state.user, entries: count }
              });
            });
        }
        this.displayFacebox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "signin" ? (
          <Signin
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUsers}
          />
        ) : this.state.route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUsers={this.loadUsers}
          />
        ) : (
          <div>
            {" "}
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onInputSubmit={this.onInputSubmit}
            />
            <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
