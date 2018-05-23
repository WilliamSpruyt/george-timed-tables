import React from "react";
import Game from "./game";
import Main from "./main";
import StatList from "./components/statList";
import { Switch, Route } from "react-router-dom";
export const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={game} />
      <Route path="/roster" component={statList} />
    </Switch>
  </main>
);
