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
    const [socketUrl, setSocketUrl] = useState("ws://localhost:8080/ws");
    const {sendMessage, lastMessage, readyState} = useWebSocket(socketUrl);

    const connected = readyState === ReadyState.OPEN;
    const connecting = readyState === ReadyState.CONNECTING;

    return (
        <div>
            <nav className="navbar bg-primary">
                <div className="container content-size justify-content-start">
                    <a className="navbar-brand btn-link" href="#">
                        <Logo width="42" height="42" className="d-inline-block header-icon"/>
                    </a>
                    <div className="header-text">WebSocket Chart</div>
                </div>
            </nav>

            <div className="container content-size mt-4">
                <div className="row">
                    <div className="col-12 container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-9">
                                <div className="input-group my-2">
                                    <input id="websocket-address"
                                           type="url"
                                           className="form-control"
                                           value={socketUrl}
                                           onChange={e => setSocketUrl(e.target.value)}
                                           placeholder="WebSocket url"/>
                                    <button type="button" className="btn btn-outline-primary">
                                        {connected ? "Disconnect" : "Connect"}
                                    </button>
                                </div>
                            </div>

                            <div className="col-3">
                                <span className="h4">
                                    <i className={
                                        "bi bi-circle-fill " +
                                        (connected ? "text-success" : (connecting ? "text-warning blink" : "text-danger "))
                                    }/>
                                    &nbsp;{statuses[readyState]}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card my-4 chart-height">TEST</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;