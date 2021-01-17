import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import background from "../images/videocall.jpg";
import Button from "./Button";

export default function home() {
    return (
        <div
            style={{
                background: "#fce5d9",
                minHeight: "100vh",
            }}
        >
            <Header></Header>
            <div
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    filter: "blur(10px)",
                    opacity: "0.7",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        padding: "450px",
                    }}
                ></h1>
            </div>
            <h1
                style={{
                    position: "relative",
                    fontSize: "40px",
                    textAlign: "center",
                    top: "-500px",
                }}
            >
                A Simple Way to Call
            </h1>
            <Link to="../room">
                <Button text="Join Room" />
            </Link>{" "}
        </div>
    );
}
