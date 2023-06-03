export type Message = {
    message: string,
    time: string
    user: string
}

export enum ConnectionState {
    CONNECTED, DISCONNECTED, ERROR
}