import React, { Component } from "react";
import Header from "./Components/Header.js";
import "./App.css";

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="App" style={{ backgroundColor: "black" }}>
                <Header></Header>
            </div>
        );
    }
}

export default App;
