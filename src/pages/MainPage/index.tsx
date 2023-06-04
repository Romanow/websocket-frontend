import React, {FC, useEffect, useRef, useState} from "react";
import _ from "lodash";

import useWebSocket from "../../hooks/useWebSocket";
import useSubscription from "../../hooks/useSubscription";
import useErrorSubscription from "../../hooks/useErrorSubscription";
import {ConnectionState, Message} from "../../types";
import MessageItem from "../../components/MessageItem";
import Header from "../../components/Header";
import User from "../../components/User";
import "../../index.css";

const MainPage: FC = () => {
    const messagesRef = useRef<HTMLDivElement>(null)
    const [connectionState, toggleConnectionState] = useState(false)
    const [login, setLogin] = useState("test")
    const [address, setAddress] = useState("ws://localhost:8080/ws");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const {state, client} = useWebSocket(connectionState, address, login, "test")

    const [newMessage] = useSubscription<Message>("/queue/message", state, client)
    const [initMessages] = useSubscription<Message[]>("/user/queue/init/messages", state, client)

    const [users] = useSubscription<string[]>("/queue/users", state, client)
    const [initUsers] = useSubscription<string[]>("/user/queue/init/users", state, client)
    useErrorSubscription(state, client)

    useEffect(() => {
        if (state === ConnectionState.CONNECTED) {
            setTimeout(() => {
                client?.publish({destination: "/chat/init/users"})
                client?.publish({destination: "/chat/init/messages"})
            }, 200)
        } else {
            setMessage("")
            setMessages([])
        }
    }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(`Init messages: [${initMessages}]`)
        if (isConnected && _.isEmpty(messages) && !_.isEmpty(initMessages)) {
            setMessages(initMessages!!)
        }
    }, [initMessages]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (newMessage) {
            console.log(`New message: [${newMessage}]`)
            setMessages([...messages, newMessage!!])
        }
    }, [newMessage]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        messagesRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages]);

    const isConnected = state === ConnectionState.CONNECTED;
    const handleClick = () => toggleConnectionState(!isConnected)
    const sendMessage = () => {
        client?.publish({destination: "/chat/message", body: message})
        setMessage("")
    }

    const activeUsers = (isConnected && _.filter(users || initUsers || [], u => u !== login)) || []

    return (
        <div>
            <Header isConnected={isConnected}/>
            <div className="container-fluid">
                <div className="row content justify-content-evenly">
                    <div className="col-3">
                        <div className="user-container rounded-2 border my-3">
                            <div className="text-center fs-4 my-3">USERS</div>
                            <ul className="list-group overflow-auto user-list border-start border-2 border-warning rounded-0">
                                {isConnected && <User name={login}/>}
                                {activeUsers.map(user => <User key={user} name={user}/>)}
                            </ul>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border rounded-2 my-3 py-1">
                            <div className="chat-container">
                                {messages.map(m => <MessageItem key={m.time} message={m} login={login}/>)}
                                <div ref={messagesRef}/>
                            </div>
                        </div>
                        <div className="message-container d-flex align-items-center ">
                            <textarea className="form-control"
                                      value={message}
                                      onChange={e => setMessage(e.target.value)}/>
                            <button type="button"
                                    className="btn btn-primary mx-2"
                                    disabled={!isConnected}
                                    onClick={sendMessage}>
                                SEND
                            </button>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="connection-container rounded-2 border my-3">
                            <div className="text-center fs-4 my-3">CONNECTION</div>
                            <form className="container">
                                <div className="row my-2">
                                    <label htmlFor="address" className="col-3 col-form-label">Address</label>
                                    <div className="col-9">
                                        <input id="address"
                                               type="text"
                                               className="form-control"
                                               readOnly={isConnected}
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
                                               readOnly={isConnected}
                                               onChange={e => setLogin(e.target.value)}
                                               value={login}/>
                                    </div>
                                </div>
                                <div className="row my-2 justify-content-center">
                                    <div className="col-4">
                                        <button className="btn btn-primary" type="button" onClick={handleClick}>
                                            {isConnected ? "Disconnect" : "Connect"}
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