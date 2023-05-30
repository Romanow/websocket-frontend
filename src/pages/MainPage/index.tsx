import React, {FC} from "react";
import {ReactComponent as Logo} from "../../images/websocket.svg";

import "../../index.css";

const MainPage: FC = () => {
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
                    <i className="bi bi-circle-fill text-danger blink"/>
                    &nbsp;Disconnected
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row vh-100 justify-content-evenly">
                    <div className="col-3">
                        <div className="rounded-2 border user-box">
                            <div className="text-center fs-4 my-3">USERS</div>
                            <ul className="list-group overflow-auto user-list border-start border-2 border-warning rounded-0">
                                <li className="list-item d-flex align-items-center">
                                    <i className="bi bi-circle-fill text-success"/>
                                    <button className="btn btn-link">Alex</button>
                                </li>
                                <li className="list-item">
                                    <i className="bi bi-circle-fill text-success"/>
                                    <button className="btn btn-link">Mike</button>
                                </li>

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
                                               value="ws://localhost:8080/ws"/>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <label htmlFor="login" className="col-3 col-form-label">Login</label>
                                    <div className="col-9">
                                        <input id="login"
                                               type="text"
                                               className="form-control"
                                               value="ronin"/>
                                    </div>
                                </div>
                                <div className="row my-2 justify-content-center">
                                    <div className="col-4">
                                        <button className="btn btn-primary">Connect</button>
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