

import "es6-object-assign/auto";
import "core-js/fn/array/includes";
import "core-js/fn/promise/finally";
import "intl"; // For Safari 9

import React from "react";
import ReactDOM from "react-dom";

import analytics from "../src/lib/analytics";
//'../lib/analytics';
import AppStateHOC from "../src/lib/app-state-hoc.jsx";
//'../src/lib/app-state-hoc.jsx';
import BrowserModalComponent from "../src/components/browser-modal/browser-modal.jsx";
//'../components/browser-modal/browser-modal.jsx';
import supportedBrowser from "../src/lib/supported-browser";
//'../lib/supported-browser';
import styles from "../src/playground/index.css";
// './index.css';
// Register "base" page view
//analytics.pageview('/');

export default function MainApp() {
    const appTarget = document.createElement("div");
        appTarget.className = styles.app;
        document.body.appendChild(appTarget);
        require('./render-gui.jsx').default(appTarget);
}
