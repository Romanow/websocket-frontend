export type Subscription = {
    dest: string,
    resolve: (value: string | PromiseLike<string>) => void
}

export enum ConnectionState {
    CONNECTED, DISCONNECTED, ERROR
}