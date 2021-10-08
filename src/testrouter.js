import React, { useContext, createContext, useState } from "react";
import {BrowserRouter as Router,Switch,Route,Link,Redirect,useHistory,useLocation} from "react-router-dom";

export default function AuthExample() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}



/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);


  const signin = (cb) => {
    return setTimeout(() => {
      setUser("user");
      cb();
    }, 100)
    
  };

  const signout = (cb) => {
    return setTimeout(() => {
      setUser(null);
      cb();
    }, 100)
    
  };

  return {
    user,
    signin,
    signout,
  };
}

// const fakeAuth = {
//   isAuthenticated: false,
//   signin(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };














function AuthButton() {
  let history = useHistory();
  let auth = useContext(authContext);;

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useContext(authContext);;
  return (
    <Route {...rest} render={({ location }) => auth.user ? children : <Redirect to={{pathname: "/login",state: { from: location },}} />} />
  );
}







function LoginPage() {
  let history = useHistory();
  let auth = useContext(authContext);
  
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
function PublicPage() {
  return <h3>Public</h3>;
}
function ProtectedPage() {
  return <h3>Protected</h3>;
}


