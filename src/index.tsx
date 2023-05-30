import React from "react";
import {createRoot} from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import MainPage from "./pages/MainPage";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<MainPage/>);