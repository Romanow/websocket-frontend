import {Client} from "@stomp/stompjs";

const log = (message: string) => () => {
    console.log(message)
}

const client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    connectHeaders: {
        "X-Authorization": window.btoa("test:test")
    },
    reconnectDelay: 0,
    onConnect: () => {
        client.subscribe("/queue/reply", message =>
            console.log(`Application received: ${message.body}`)
        );
        client.subscribe("/user/queue/reply", message =>
            console.log(`User received: ${message.body}`)
        );
        client.subscribe("/user/queue/errors", message =>
            console.log(`Error received: ${message.body}`)
        );
        client.publish({destination: "/chat/request", body: "First Message"});
    },
    onStompError: log("Error"),
    onDisconnect: log("Disconnected")
});

client.activate();