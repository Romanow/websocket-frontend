import React, {FC} from "react";

type UserProps = {
    name: string
}

const User: FC<UserProps> = ({name}) => {
    return (
        <li className="list-item d-flex align-items-center">
            <i className="bi bi-circle-fill text-success"/>
            <label data-test-id="user" className="user-label">{name}</label>
        </li>
    )
}

export default User;