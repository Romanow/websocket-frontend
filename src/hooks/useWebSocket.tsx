import {Client} from "@stomp/stompjs";
import {useEffect, useState} from "react";
import {ConnectionState} from "../types";

const useWebSocket = (connectionState: boolean, address: string, login: string, password: string) => {
    const [state, setState] = useState<ConnectionState>()
    const [client, setClient] = useState<Client>()

    useEffect(() => {
        if (connectionState) {
            const client = new Client({
                brokerURL: address,
                connectHeaders: {"X-Authorization": window.btoa(`${login}:${password}`)},
                disconnectHeaders: {"X-Authorization": window.btoa(`${login}:${password}`)},
                reconnectDelay: 15000,
                onConnect: () => setState(ConnectionState.CONNECTED),
                onWebSocketError: () => setState(ConnectionState.ERROR),
                onWebSocketClose: () => setState(ConnectionState.DISCONNECTED),
                onStompError: () => setState(ConnectionState.ERROR),
                onDisconnect: () => setState(ConnectionState.DISCONNECTED),
                debug: (msg: string) => console.info(msg)
            });
            client.activate();

            setClient(client)
            setState(client.webSocket?.readyState)
        }
    }, [connectionState])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!connectionState && state === ConnectionState.CONNECTED) {
            client?.deactivate()
        }
    }, [connectionState])  // eslint-disable-line react-hooks/exhaustive-deps

    return {state, client}
}

export default useWebSocket;