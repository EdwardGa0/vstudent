import React from "react";

const Button = ({ link, text }) => (
    <button
        style={{
            backgroundColor: "white",
            color: "black",
            padding: "14px",
            borderRadius: "40px",
            fontSize: "40px",
            outline: "none",
            fontWeight: "500",
            position: "absolute",
            left: "50%",
            top: "1000px",
            transform: "translateX(-50%)",
        }}
    >
        {text}
    </button>
);

export default Button;
