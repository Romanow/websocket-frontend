import React, {FC, useEffect, useState} from "react";
import {StompSocketState} from "@stomp/stompjs";

import {ReactComponent as Logo} from "../../images/websocket.svg";
import useWebSocket from "../../hooks/useWebSocket";
import "../../index.css";

const MainPage: FC = () => {
    const {state, connect, subscribe, sendMessage, controlMessage, disconnect} = useWebSocket()
    const [users, setUsers] = useState<string[]>([])

    useEffect(() => {
        subscribe("/queue/users").then(data => setUsers(JSON.parse(data)))
        subscribe("/user/queue/users").then(data => setUsers(JSON.parse(data)))
    }, [users])

    // subscribe("/user/queue/errors")
    //     .then(data => console.log(`Error received: ${data}`))

    const handleClick = () => {
        if (state !== StompSocketState.OPEN) {
            connect(address, login, "test")
                .then(() => controlMessage("/queue/users", ""))
        } else {
            disconnect()
        }
    }

    const [address, setAddress] = useState("ws://localhost:8080/ws");
    const [login, setLogin] = useState("test")
    return (
        <div>
            <nav className="navbar bg-primary text-center justify-content-around">
                <div className="col-4 d-inline-flex align-items-center">
                    <a className="navbar-brand" href="#">
                        <Logo width="42" height="42" className="header-icon"/>
                    </a>
                    <div className="fs-4 header-color">WebSocket Chat</div>
                </div>
                <div className="col-4 fs-4 text-end header-color">
                    {state !== StompSocketState.OPEN
                        ? (<div><i className="bi bi-circle-fill text-danger blink"/>&nbsp;Disconnected</div>)
                        : (<div><i className="bi bi-circle-fill text-success"/>&nbsp;Connected</div>)}
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row vh-100 justify-content-evenly">
                    <div className="col-3">
                        <div className="rounded-2 border user-box">
                            <div className="text-center fs-4 my-3">USERS</div>
                            <ul className="list-group overflow-auto user-list border-start border-2 border-warning rounded-0">
                                {users.map(user =>
                                    <li key={user} className="list-item d-flex align-items-center">
                                        <i className="bi bi-circle-fill text-success"/>
                                        <button className="btn btn-link">{user}</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col-5 border">
                        TEST
                    </div>
                    <div className="col-3">
                        <div className="rounded-2 border connection-box">
                            <div className="text-center fs-4 my-3">CONNECTION</div>
                            <form className="container">
                                <div className="row my-2">
                                    <label htmlFor="address" className="col-3 col-form-label">Address</label>
                                    <div className="col-9">
                                        <input id="address"
                                               type="text"
                                               className="form-control"
                                               onChange={e => setAddress(e.target.value)}
                                               value={address}/>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <label htmlFor="login" className="col-3 col-form-label">Login</label>
                                    <div className="col-9">
                                        <input id="login"
                                               type="text"
                                               className="form-control"
                                               onChange={e => setLogin(e.target.value)}
                                               value={login}/>
                                    </div>
                                </div>
                                <div className="row my-2 justify-content-center">
                                    <div className="col-4">
                                        <button className="btn btn-primary" onClick={handleClick}>
                                            {state !== StompSocketState.OPEN ? "Connect" : "Disconnect"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;