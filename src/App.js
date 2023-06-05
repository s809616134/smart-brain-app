import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBackGround from "./components/ParticlesBackGround/ParticlesBackGround";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const initialState = {
  input: "",
  box: {},
  imgUrl: "",
  route: "signin",
  isSignedIn: false,
  //userInfo,update when login or gegister
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};
class App extends React.Component {
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

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (response) => {
    const faceLocation =
      response.outputs[0].data.regions[0].region_info.bounding_box;
    //get image height and weight
    const image = document.getElementById("inputImg");
    const imgHeight = Number(image.height);
    const imgWidth = Number(image.width);
    // position of the bounding box
    const boxPosition = {
      top: faceLocation.top_row * imgHeight,
      left: faceLocation.left_col * imgWidth,
      bottom: imgHeight - faceLocation.bottom_row * imgHeight,
      right: imgWidth - faceLocation.right_col * imgWidth,
    };
    console.log(boxPosition);
    return boxPosition;
  };

  displayFaceLocation = (box) => {
    this.setState({ box: box });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  onButtonSubmit = () => {
    //1st pram is the id of face-detection version, which on website

    //get input value
    //setState is ASYNCHRONOUS
    this.setState({ imgUrl: this.state.input });

    fetch("https://smart-brain-api-seven.vercel.app/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //update the entries when submit
        if (res) {
          fetch("https://smart-brain-api-seven.vercel.app/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceLocation(this.calculateFaceLocation(res));
      })
      .catch((err) => console.log(err));
    //fetch api with ipnut state
  };
  render() {
    const { imgUrl, box, isSignedIn, route, user } = this.state;
    return (
      <div className="App">
        <ParticlesBackGround />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank entries={user.entries} name={user.name} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imgUrl={imgUrl} />
          </div>
        ) : route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
