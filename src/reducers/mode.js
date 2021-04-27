import { func } from "prop-types";
import ConfigServer from "../config_server";

const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';

const SET_MY_PROJECT = 'scratch-gui/mode/SET_MY_PROJECT';
const SET_STORE_MY_PROJECT = 'scratch-gui/mode/SET_STORE_MY_PROJECT';

const initialState = {
    showBranding: false,
    isFullScreen: false,
    isPlayerOnly: false,
    hasEverEnteredEditor: true,
    showMyProject: false,
    storeMyProject: false

};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_FULL_SCREEN:
        return Object.assign({}, state, {
            isFullScreen: action.isFullScreen
        });
    case SET_MY_PROJECT:
            return Object.assign({}, state, {
                showMyProject: action.showMyProject
            });

    case SET_STORE_MY_PROJECT:
            return Object.assign({}, state, {
                storeMyProject: action.storeMyProject
            });
    case SET_PLAYER:
        return Object.assign({}, state, {
            isPlayerOnly: action.isPlayerOnly,
            hasEverEnteredEditor: state.hasEverEnteredEditor || !action.isPlayerOnly
        });
    default:
        return state;
    }
};



const setFullScreen = function (isFullScreen) {
    //ConfigServer.host = getIP();
    return {
        type: SET_FULL_SCREEN,
        isFullScreen: isFullScreen
    };
};

const setMyProject = function (showMyProject) {
    return {
        type: SET_MY_PROJECT,
        showMyProject: showMyProject
    };
};

const setStoreMyProject = function(storeMyProject){

    console.log("setStoreMyProject",storeMyProject);
    return {
        type: SET_STORE_MY_PROJECT,
        storeMyProject: storeMyProject
    };
}
const setPlayer = function (isPlayerOnly) {
    return {
        type: SET_PLAYER,
        isPlayerOnly: isPlayerOnly
    };
};

export {
    reducer as default,
    initialState as modeInitialState,
    setFullScreen,
    setPlayer,
    setMyProject,
    setStoreMyProject
};
