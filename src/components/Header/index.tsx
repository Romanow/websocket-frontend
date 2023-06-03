import React, {FC} from "react";
import {ReactComponent as Logo} from "../../images/websocket.svg";

type HeaderProps = {
    isConnected: boolean
}

const Header: FC<HeaderProps> = ({isConnected}) => {
    return (
        <nav className="navbar bg-primary text-center justify-content-around">
            <div className="col-4 d-inline-flex align-items-center">
                <a className="navbar-brand" href="#">
                    <Logo width="42" height="42" className="header-icon"/>
                </a>
                <div className="fs-4 header-color">WebSocket Chat</div>
            </div>
            <div className="col-4 fs-4 text-end header-color">
                {isConnected
                    ? (<div><i className="bi bi-circle-fill text-success"/>&nbsp;Connected</div>)
                    : (<div><i className="bi bi-circle-fill text-danger blink"/>&nbsp;Disconnected</div>)}
            </div>
        </nav>
    )
}

export default Header;