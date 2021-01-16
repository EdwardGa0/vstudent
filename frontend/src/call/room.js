import React, { Component } from "react";
import ConnectionStatus from "../opentok/ConnectionStatus";
import Publisher from "../opentok/Publisher";
import Subscriber from "../opentok/Subscriber";
import { OTSession, OTStreams, preloadScript, OTSubscriber } from "opentok-react";

export default class room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sessionCredentials: null,
      error: null,
      connected: false,
      volume: 10
    };

    this.subscriberProperties = {
      audioVolume: this.state.volume
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

  onclick(type){
    this.setState(prevState => {
       return {volume: type === 'add' ? prevState.volume + 10: prevState.volume - 10}
    });
  }

  async componentDidMount() {
    const url = "https://vstudent-server.herokuapp.com/generate";
    fetch(url).then(response => response.json()).then(json => this.setState({sessionCredentials: json})).catch(function(error) {
      console.log('Request failed', error)});
  }

  render() {
    if (!this.state.sessionCredentials) {
      return <div>Error with session retrieval</div>
    }

    return (
      <div>
        <div>Volume: {this.state.volume}
          <input type='button' onClick={this.onclick.bind(this, 'add')} value='Inc'/>
          <input type='button' onClick={this.onclick.bind(this, 'sub')} value='Dec'/>
        </div>
        <OTSession
          apiKey={this.state.sessionCredentials.apiKey}
          sessionId={this.state.sessionCredentials.sessionId}
          token={this.state.sessionCredentials.token}
          eventHandlers={this.sessionEvents}
          onError={this.onError}
        >
          {this.state.error ? <div id="error">{this.state.error}</div> : null}
          <ConnectionStatus connected={this.state.connected} />
          <Publisher />
          <OTStreams>
            <OTSubscriber properties={this.subscriberProperties}/>
          </OTStreams>
        </OTSession>
      </div>
    );
  }
}
