import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <Link
            to=""
            style={{
                textDecoration: "none",
            }}
        >
            <div
                style={{
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 50,
                }}
            >
                <div
                    style={{
                        color: "black",
                        fontSize: "36px",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontWeight: "700",
                            fontSize: "50px",
                        }}
                    >
                        VS
                    </h1>
                </div>
                <div
                    style={{
                        color: "black",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        minWidth: "10000px",
                        marginTop: 13,
                    }}
                >
                    <h1>tudent</h1>
                </div>
                <br />
            </div>
        </Link>
    );
}

export default Header;
