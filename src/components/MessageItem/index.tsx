import React, {FC} from "react";
import moment from "moment/moment";
import {Message} from "../../types";

type MessageItemProps = {
    message: Message,
    login: string
}

const MessageItem: FC<MessageItemProps> = ({message: {message, user, time}, login}) => {
    return (
        <div
            className={"message-item border rounded-1 d-flex align-items-center justify-content-between " + ((user === login) && "current-user")}>
            <label>{message}</label>
            <div className="text-end text-secondary font-size-50 ms-2">
                <span>@{user}</span>
                <br/>
                <span>{moment(time).format("DD-MM-yyyy HH:mm:SS")}</span>
            </div>
        </div>
    )
}

export default MessageItem;