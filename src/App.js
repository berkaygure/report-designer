import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./routes/Welcome";
import Application from "./routes/Application";

const _ = require("lodash");

window._ = _;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/edit/:id" component={Application} />
        </Switch>
      </div>
    );
  }
}

export default App;
