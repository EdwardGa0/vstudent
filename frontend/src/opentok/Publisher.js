import React from "react";
import { OTPublisher } from "opentok-react";
import CheckBox from "./CheckBox"
import App from "../App";
import "../App.css";
import { getFilteredCanvas } from "./filter";
const OT = require("@opentok/client");

class Publisher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      audio: true,
      video: true,
      filteredCanvasLoaded: false,
    };
  }

  setAudio = (audio) => {
    this.setState({ audio });
  };

  setVideo = (video) => {
    this.setState({ video });
  };

  changeVideoSource = (videoSource) => {
    this.state.videoSource !== "camera"
      ? this.setState({ videoSource: "camera" })
      : this.setState({ videoSource: "screen" });
  };

  onError = (err) => {
    this.setState({ error: `Failed to publish: ${err.message}` });
  };

  componentDidMount() {
    // var that = this;
    // OT.getUserMedia().then(function gotMedia(mediaStream) {
    //   console.log(mediaStream);
    //   that.setState({
    //     filteredCanvas: getFilteredCanvas(mediaStream),
    //     filteredCanvasLoaded: true,
    //   });
    // });
    //{this.state.filteredCanvasLoaded && (
  }

  render() {
    return (
      <div className="publisher">
        <h1>Host</h1>
        {this.state.error ? <div id="error">{this.state.error}</div> : null}
        
          <OTPublisher
            properties={{
              publishAudio: this.state.audio,
              publishVideo: this.state.video,
              //videoSource: this.state.filteredCanvas.canvas
                //.captureStream(30)
                //.getVideoTracks()[0],
            }}
            onError={this.onError}
          />
        <CheckBox label="Share Screen" onChange={this.changeVideoSource} />
        <CheckBox
          label="Publish Audio"
          initialChecked={this.state.audio}
          onChange={this.setAudio}
        />
        <CheckBox
          label="Publish Video"
          initialChecked={this.state.video}
          onChange={this.setVideo}
        />
      </div>
    );
  }
}
export default Publisher;
