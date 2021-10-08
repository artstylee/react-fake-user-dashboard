import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./login-page"
import ProfilePage from "./profile-page";


export default function App() {
  const [login, setLogin] = useState(null);


  useLayoutEffect(() => {
    const getCookieValue = (name) => (
      document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )
    const cookie = getCookieValue("userid")

    cookie ? setLogin(true) : setLogin(false)
  }, [])


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {login ? <Redirect to="/profile" /> : <LoginPage login={login} setLogin={setLogin}/>}
        </Route>
        <Route exact path="/profile">
          {!login ? <Redirect to="/" /> : <ProfilePage setLogin={setLogin}/>}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}