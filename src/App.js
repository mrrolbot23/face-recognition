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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
    };
  }

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

    // console.log(getFaces(faces));
    return getFaces(faces);
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = process.env.REACT_APP_PAT;
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "mrrolbot23";
    const APP_ID = process.env.REACT_APP_APP_ID;
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.displayFaceBox(this.newFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
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
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
