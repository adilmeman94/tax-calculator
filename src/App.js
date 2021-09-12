import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import MainPage from "./Components/MainPage";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import SignIn from "./Components/SignIn";

export default function App() {
  const [name, setName] = useState(null);

  useEffect(() => {
    const Name = localStorage.getItem("name");
    setName(Name);
  });

  return (
    <BrowserRouter>
      <Navbar name={name} setName={setName} />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/signin"
          exact
          render={(props) => {
            if (name !== null) {
              return <Redirect to="/home" />;
            } else {
              return <SignIn setName={setName} {...props} />;
            }
          }}
        />
        <PrivateRoute exact={true} path="/home" component={Home} name={name} />
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ component: Component, name, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (name === null) {
          // alert("Hi User, You have to login to access this page");
          return <Redirect to="/signin" />;
        } else {
          return <Component {...props} name={name} />;
        }
      }}
    />
  );
}
