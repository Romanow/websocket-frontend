import React, {FC} from "react";
import MessageItem from "../MessageItem";

type UserProps = {
    name: string
}

const User: FC<UserProps> = ({name}) => {
    return (
        <li className="list-item d-flex align-items-center">
            <i className="bi bi-circle-fill text-success"/>
            <label className="user-label">{name}</label>
        </li>
    )
}

export default User;