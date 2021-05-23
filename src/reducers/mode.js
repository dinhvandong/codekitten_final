import { func } from "prop-types";
import ConfigServer from "../config_server";

const SET_FULL_SCREEN = "scratch-gui/mode/SET_FULL_SCREEN";
const SET_PLAYER = "scratch-gui/mode/SET_PLAYER";

const SET_MY_PROJECT = "scratch-gui/mode/SET_MY_PROJECT";
const SET_STORE_MY_PROJECT = "scratch-gui/mode/SET_STORE_MY_PROJECT";

const SET_SHOW_LOGIN = "scratch-gui/mode/SET_SHOW_LOGIN";
const SET_SHOW_REGISTER = "scratch-gui/mode/SET_SHOW_REGISTER";

const initialState = {
    showBranding: false,
    isFullScreen: false,
    isPlayerOnly: false,
    hasEverEnteredEditor: true,
    showMyProject: false,
    storeMyProject: false,
    showLogin: false,
    showRegister: false,
};

const reducer = function (state, action) {
    if (typeof state === "undefined") state = initialState;
    switch (action.type) {
        case SET_FULL_SCREEN:
            return Object.assign({}, state, {
                isFullScreen: action.isFullScreen,
            });
        case SET_MY_PROJECT:
            return Object.assign({}, state, {
                showMyProject: action.showMyProject,
            });

        case SET_STORE_MY_PROJECT:
            return Object.assign({}, state, {
                storeMyProject: action.storeMyProject,
            });
        case SET_PLAYER:
            return Object.assign({}, state, {
                isPlayerOnly: action.isPlayerOnly,
                hasEverEnteredEditor:
                    state.hasEverEnteredEditor || !action.isPlayerOnly,
            });

        case SET_SHOW_LOGIN:
            return Object.assign({}, state, {
                showLogin: action.showLogin,
            });

        case SET_SHOW_REGISTER:
            return Object.assign({}, state, {
                showRegister: action.showRegister,
            });

        default:
            return state;
    }
};

const setFullScreen = function (isFullScreen) {
    //ConfigServer.host = getIP();
    return {
        type: SET_FULL_SCREEN,
        isFullScreen: isFullScreen,
    };
};

const setMyProject = function (showMyProject) {
    return {
        type: SET_MY_PROJECT,
        showMyProject: showMyProject,
    };
};

const setStoreMyProject = function (storeMyProject) {
    console.log("setStoreMyProject", storeMyProject);
    return {
        type: SET_STORE_MY_PROJECT,
        storeMyProject: storeMyProject,
    };
};

const setShowLogin = function (showLogin) {
    console.log("setShowLogin", showLogin);
    return  {
        type: SET_SHOW_LOGIN,
        showLogin: showLogin
    };
};

const setShowRegister = function (showRegister) {
    return {
        type: SET_SHOW_REGISTER,
        showRegister: showRegister,
    };
};
const setPlayer = function (isPlayerOnly) {
    return {
        type: SET_PLAYER,
        isPlayerOnly: isPlayerOnly,
    };
};

export {
    reducer as default,
    initialState as modeInitialState,
    setFullScreen,
    setPlayer,
    setMyProject,
    setStoreMyProject,
    setShowLogin,
    setShowRegister,
};
