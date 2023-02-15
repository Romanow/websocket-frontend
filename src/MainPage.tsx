import React, {FC, useState} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {ReactComponent as Logo} from "./images/websocket.svg";

import "./index.css";

const statuses = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
};

const MainPage: FC = () => {
    const [message, setMessage] = useState("");

    const {readyState} = useWebSocket("ws://localhost:8080/ws");

    const connected = readyState === ReadyState.OPEN;
    const connecting = readyState === ReadyState.CONNECTING;

    return (
        <div>
            <nav className="navbar bg-primary">
                <div className="container content justify-content-start">
                    <a className="navbar-brand btn-link" href="#">
                        <Logo width="42" height="42" className="d-inline-block header-icon"/>
                    </a>
                    <div className="header-text">WebSocket Chart</div>
                </div>
                <div className="container ">
                    <i className={"bi bi-circle-fill " + (connected ? "text-success" : (connecting ? "text-warning blink" : "text-danger "))}/>
                    &nbsp;{statuses[readyState]}
                </div>
            </nav>
        </div>
    )
}

export default MainPage;