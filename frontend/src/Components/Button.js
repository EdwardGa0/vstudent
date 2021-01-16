import React from "react";

function Button(text) {
    return (
        <button
            style={{
                backgroundColor: "black",
                colour: "white",
                padding: "14px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "500",
            }}
        >
            {text}
        </button>
    );
}

export default Button;
