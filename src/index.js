/*
I used this link from github to deploy to
heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./app";
import { Header } from "./header";
import { BrowserRouter } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";
class George extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App />
      </div>
    );
  }
}
ReactDOM.render(
  <BrowserRouter>
    <George />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
