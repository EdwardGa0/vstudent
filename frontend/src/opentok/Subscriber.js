import React from "react";
import { OTSubscriber } from "opentok-react";
import CheckBox from "./CheckBox";
import "../App.css";
import Button from '@material-ui/core/Button';

class Subscriber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: true,
      volume: this.props.volume,
      subscriber: null,
      focused: false
    };
    //this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.otSubscriber = React.createRef();
  }

  setAudio = (audio) => {
    this.setState({ audio });
  };

  setVideo = (video) => {
    this.setState({ video });
  };

  onError = (err) => {
    this.setState({ error: `Failed to subscribe: ${err.message}` });
  };

  // onChange(e){
  //   const re = /^[0-99\b]+$/;
  //   if (e.target.value === '' || re.test(e.target.value)) {
  //      this.setState({value: e.target.value})
  //      this.otSubscriber.current.state.subscriber.setAudioVolume(parseInt(e.target.value));
  //   }
  // }

  handleClick() {
    console.log(this);
    if (this.state.focused) {
      this.setState({focused: false});
      this.otSubscriber.current.state.subscriber.setAudioVolume(10);
    } else {
      this.setState({focused: true});
      this.otSubscriber.current.state.subscriber.setAudioVolume(90);
    }
    
  }

  componentDidMount() {
    this.getSubscriber();
    
    console.log(this.otSubscriber.current);
  }

  getSubscriber() {
    if (this.otSubscriber) {
      this.setState({
        subscriber: this.otSubscriber.current.getSubscriber(),
      });
    }
  }

  render() {
    return (
      <div className="subscriber">
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          {this.state.focused ? "Unfocus me" : "Focus on me"}
        </Button>
        
        Subscriber
        {this.state.error ? <div id="error">{this.state.error}</div> : null}
        <OTSubscriber
          ref={this.otSubscriber}
          properties={{
            subscribeToAudio: this.state.audio,
            subscribeToVideo: this.state.video,
            audioVolume: this.state.volume
          }}
          onError={this.onError}
        />
        <CheckBox
          label="Subscribe to Audio"
          initialChecked={this.state.audio}
          onChange={this.setAudio}
        />
        <CheckBox
          label="Subscribe to Video"
          initialChecked={this.state.video}
          onChange={this.setVideo}
        />
      </div>
    );
  }
}
export default Subscriber;
