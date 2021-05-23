import React from "react";
import ReactDOM from "react-dom";
import RegisterPassword from "./components/login/register-password.jsx";
import RegisterOTP from "./components/login/register-otp.jsx";
import RegisterCodeKitten from "./components/login/register-codekitten.jsx";

import ForgotPassword from "./components/login/forgot-password.jsx";
//    //require('./render-gui.jsx').default(appTarget);

import LoginCodeKitten from "./components/login/login.jsx";


import Community from '../src/components/community/community.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
} from "react-router-dom";
//import { AppTG } from "./playground/render-gui.jsx";
//import MainApp from "./main.jsx";

//import styles from './index.css';
// Register "base" page view
import { createBrowserHistory } from "history";

function App() {
    const appTarget = document.createElement("div");
    // appTarget.className = styles.app;
    document.body.appendChild(appTarget);
    const hist = createBrowserHistory();

    return (
        <Router history={hist}>
            <div style={{ width: "100%", height: "100%" }}>               
                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() =>{
                            return <Redirect to="/login" />;
                        }}
                    />
                    <Route exact path="/login" component={Community} />
                    <Route path="/forgot_password">
                        <ForgotPassword />
                    </Route>
                    <Route path="/register_password">
                        <RegisterPassword />
                    </Route>
                    <Route path="/register_codekitten">
                    <RegisterCodeKitten />
                    </Route>
                    <Route path="/register_otp">
                    <RegisterOTP />
                </Route>

                </Switch>
            </div>
        </Router>
    );
}

export default (index) => {
    ReactDOM.render(<App />, index);
};
