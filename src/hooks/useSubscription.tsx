import {Client} from "@stomp/stompjs";
import {useEffect, useState} from "react";
import {ConnectionState} from "../types";

const useSubscription = <T, >(dest: string, state?: ConnectionState, client?: Client) => {
    const [items, setItems] = useState<T>()

    useEffect(() => {
        if (state === ConnectionState.CONNECTED) {
            client!!.subscribe(dest, message => {
                console.log(`New items: ${message.body}`)
                setItems(JSON.parse(message.body))
            })
        }
    }, [state])

    return [items]
}

export default useSubscription;