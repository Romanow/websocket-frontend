import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import MainPage from "./MainPage";

ReactDOM.render(
    <React.StrictMode>
        <MainPage/>
    </React.StrictMode>,
    document.getElementById("root")
);