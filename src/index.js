/*
I used this link from github to deploy to
heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./app";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
