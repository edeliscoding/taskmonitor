import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Tasklist from "./Tasklist";
import Navbar from "./Navbar";
import { Apporiginal } from "./Apporiginal";

import "bootstrap/dist/css/bootstrap.css";

import setAuthToken from "../utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">{/* <Tasklist /> */}</div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/Apporiginal" component={Apporiginal} />
        </Switch>
      </BrowserRouter>
    );
  }
}
