import React, { Component } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./components/navigation/Navigation";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm.jsx";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";

const initialState = {
  input: "",
  imageUrl: "",
  box: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  newFaceLocation = (array) => {
    const faces = array.outputs[0].data.regions;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);

    const getFaces = (faces) => {
      let face = {};
      let boxObject = [];
      for (let i = 0; i < faces.length; i++) {
        face[i] = faces[i].region_info.bounding_box;

        boxObject[i] = {
          leftCol: face[i].left_col * width,
          topRow: face[i].top_row * height,
          rightCol: width - face[i].right_col * width,
          bottomRow: height - face[i].bottom_row * height,
        };
      }
      return boxObject;
    };

    return getFaces(faces);
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetch("http://localhost:5000/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:5000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.newFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, imageUrl, box, user } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" color="#3A1078" num={120} bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank userName={user.name} userEntries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onPictureSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
