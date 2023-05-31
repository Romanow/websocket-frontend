import {Client, StompSocketState} from "@stomp/stompjs";
import {useState} from "react";
import {Subscription} from "../types";

const useWebSocket = () => {
    const [state, setState] = useState<StompSocketState>()
    const [client, setClient] = useState<Client>()
    const subscriptions: Subscription[] = []


    const updateState = () => setState(client?.webSocket?.readyState)
    const connect = (address: string, login: string, password: string): Promise<void> => {
        return new Promise<void>(resolve => {
            const client = new Client({
                brokerURL: address,
                connectHeaders: {"X-Authorization": window.btoa(`${login}:${password}`)},
                disconnectHeaders: {"X-Authorization": window.btoa(`${login}:${password}`)},
                reconnectDelay: 15000,
                onConnect: () => {
                    setState(client.webSocket?.readyState)
                    subscriptions.forEach(s => client?.subscribe(s.dest, message => s.resolve(message.body)))
                    resolve()
                },
                onWebSocketError: updateState,
                onWebSocketClose: updateState,
                onStompError: updateState,
                onDisconnect: updateState,
                debug: (msg: string) => console.info(msg)
            });
            client.activate();

            setClient(client)
            setState(client.webSocket?.readyState)
        })
    }

    const disconnect = () => {
        client?.deactivate()
    }

    const sendMessage = (msg: string) => {
        client?.publish({destination: "/chat/request", body: msg})
    }

    const controlMessage = (dest: string, msg: string) => {
        client?.publish({destination: dest, body: msg})
    }

    const subscribe = (dest: string): Promise<string> => {
        return new Promise<string>((resolve) => subscriptions.push({dest, resolve}))
    }

    return {state, connect, disconnect, subscribe, sendMessage, controlMessage}
}

export default useWebSocket;