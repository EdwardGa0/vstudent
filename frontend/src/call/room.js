import React, { Component } from "react";
import ConnectionStatus from "../opentok/ConnectionStatus";
import Publisher from "../opentok/Publisher";
import Subscriber from "../opentok/Subscriber";
import { OTSession, OTStreams, preloadScript } from "opentok-react";

export default class room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sessionInfo: null,
      error: null,
      connected: false,
    };

    this.subscriberProperties = {
      audioVolume: 1
    };

    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      },
    };
  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  };

  async componentDidMount() {
    let headers = new Headers();


    const url = "https://vstudent-server.herokuapp.com/generate";
    fetch(url).then(response => response.json()).then(json => this.setState({sessionInfo: json})).catch(function(error) {
      console.log('Request failed', error)
  });
    console.log(this.state.sessionInfo);
  }

  render() {
    if (!this.state.sessionInfo) {
      return <div>Error with session retrieval</div>
    }

    return (
      <OTSession
        apiKey={this.state.sessionInfo.apiKey}
        sessionId={this.state.sessionInfo.sessionId}
        token={this.state.sessionInfo.token}
        eventHandlers={this.sessionEvents}
        onError={this.onError}
      >
        {this.state.error ? <div id="error">{this.state.error}</div> : null}
        <ConnectionStatus connected={this.state.connected} />
        <Publisher />
        <OTStreams>
          <Subscriber properties={this.subscriberProperties}/>
        </OTStreams>
      </OTSession>
    );
  }
}
