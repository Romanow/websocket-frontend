import {Client} from "@stomp/stompjs";
import {useEffect} from "react";
import {ConnectionState} from "../types";

const useErrorSubscription = (state?: ConnectionState, client?: Client) => {
    useEffect(() => {
        if (state === ConnectionState.CONNECTED) {
            client!!.subscribe("/user/chat/errors", message => console.error(message))
        }
    }, [state])
}

export default useErrorSubscription;