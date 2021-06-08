import classNames from "classnames";
import omit from "lodash.omit";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { SCREENS } from "./constant.js";
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from "react-intl";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import tabStyles from "react-tabs/style/react-tabs.css";
import VM from "scratch-vm";
import Renderer from "scratch-render";

import Blocks from "../../containers/blocks.jsx";
import CostumeTab from "../../containers/costume-tab.jsx";
import TargetPane from "../../containers/target-pane.jsx";
import SoundTab from "../../containers/sound-tab.jsx";
import StageWrapper from "../../containers/stage-wrapper.jsx";
import Loader from "../loader/loader.jsx";
import Box from "../box/box.jsx";
import MenuBar from "../menu-bar/menu-bar.jsx";
import CostumeLibrary from "../../containers/costume-library.jsx";
import BackdropLibrary from "../../containers/backdrop-library.jsx";
import Watermark from "../../containers/watermark.jsx";

import Backpack from "../../containers/backpack.jsx";
import WebGlModal from "../../containers/webgl-modal.jsx";
import TipsLibrary from "../../containers/tips-library.jsx";
import Cards from "../../containers/cards.jsx";
import Alerts from "../../containers/alerts.jsx";
import DragLayer from "../../containers/drag-layer.jsx";
import ConnectionModal from "../../containers/connection-modal.jsx";
import TelemetryModal from "../telemetry-modal/telemetry-modal.jsx";
import layout, { STAGE_SIZE_MODES } from "../../lib/layout-constants";
import { resolveStageSize } from "../../lib/screen-utils";
import styles from "./gui.css";
import addExtensionIcon from "./ic_extension.png";
import codeIcon from "./ico_ Code-White.png";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
//import codeIcon from './icon--code.svg';
import costumesIcon from "./ico_ Costumes-White.png";
//import costumesIcon from './icon--costumes.svg';
//ico_ Sound-White.png
import soundsIcon from "./ico_ Sound-White.png";

import Modal from "react-awesome-modal";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { flex } from "to-style/src/prefixProperties";
import { ButtonToolbar } from "react-bootstrap";

import ShowMyProject from "../myproject/myproject2";
import StoreMyProject from "../storemyproject/storemyproject";
import ConfigServer from "../../config_server.js";
import { render } from "react-dom";
//import LoginCodeKitten from "../login/login.jsx";
import PopUpRegister from "../login/popup-register.jsx";

import PopUpLogin from "../login/popup-login.jsx";
import LoginCodeKitten from "../login/login.jsx";
import PopUpRegisterOTP from "../login/popup-register-otp.jsx";
import PopupForgotPassword from "../login/popup-forgot-password.jsx";
import PopUpRegisterPassword from "../login/popup-register-password.jsx";
import PopUpProjectManagement from "../community/popup-projectmanagement.jsx";
import PopUpForgotOTP from "../login/popup-forgot-otp.jsx";
import AlertLogin from "./alert-login.jsx";
import PopUpLogout from "./popup-logout.jsx";
import { truncate } from "fs";
//import soundsIcon from './icon--sounds.svg';
//ico_ Costumes-White.png
const messages = defineMessages({
    addExtension: {
        id: "gui.gui.addExtension",
        description: "Button to add an extension in the target pane",
        defaultMessage: "Add Extension",
    },
});

// Cache this value to only retrieve it once the first time.
// Assume that it doesn't change for a session.
let isRendererSupported = null;
var ip = require("ip");
console.dir(ip.address());

const host = ip.address();
const baseUrl = host + ":8080";
const GUIComponent = (props) => {
    const {
        accountNavOpen,
        activeTabIndex,
        alertsVisible,
        authorId,
        authorThumbnailUrl,
        authorUsername,
        basePath,
        backdropLibraryVisible,
        backpackHost,
        backpackVisible,
        blocksTabVisible,
        cardsVisible,
        canChangeLanguage,
        canCreateNew,
        canEditTitle,
        canManageFiles,
        canRemix,
        canSave,
        canCreateCopy,
        canShare,
        canUseCloud,
        children,
        connectionModalVisible,
        costumeLibraryVisible,
        costumesTabVisible,
        enableCommunity,
        intl,
        isCreating,
        isFullScreen,
        isPlayerOnly,
        isRtl,
        isShared,
        isTelemetryEnabled,
        loading,
        logo,
        renderLogin,
        onClickAbout,
        onClickAccountNav,
        onCloseAccountNav,
        onLogOut,
        onOpenRegistration,
        onToggleLoginOpen,
        onActivateCostumesTab,
        onActivateSoundsTab,
        onActivateTab,
        onClickLogo,
        onExtensionButtonClick,
        onProjectTelemetryEvent,
        onRequestCloseBackdropLibrary,
        onRequestCloseCostumeLibrary,
        onRequestCloseTelemetryModal,
        onSeeCommunity,
        //handleClickSaveMyProject,
        //onShowMyProject,
        //onStoreMyProject,
        onShare,
        onShowPrivacyPolicy,
        onStartSelectingFileUpload,
        onTelemetryModalCancel,
        onTelemetryModalOptIn,
        onTelemetryModalOptOut,
        showComingSoon,
        showMyProject,
        storeMyProject,
        //showRegister,
        // showLogin,
        // showRegisterPassword,
        // showForgotPassword,
        // showRegisterOtp,
        soundsTabVisible,
        stageSizeMode,
        targetIsStage,
        telemetryModalVisible,
        tipsLibraryVisible,
        vm,
        ...componentProps
    } = omit(props, "dispatch");
    if (children) {
        return <Box {...componentProps}>{children}</Box>;
    }

    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(
            tabStyles.reactTabsTabPanelSelected,
            styles.isSelected
        ),
        tabSelected: classNames(
            tabStyles.reactTabsTabSelected,
            styles.isSelected
        ),
    };
    //localStorage.setItem("login",false);
    if (isRendererSupported === null) {
        isRendererSupported = Renderer.isSupported();
    }
    const [showPopupSaveProject, setShowPopupSaveProject] = useState(false);
    const [showRgOtp, setShowRgOtp] = useState(false);
    const [showPM, setShowPM] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRequireLogin, setShowRequireLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [logoutAlert, setShowLogoutAlert] = useState(false);
    const [showForgotOTP, setShowForgotOTP] = useState(false);
    const screen_Login = "Login";
    const screen_Logout = "Login";

    const screen_Register = "Register";
    const screen_RegisterPassword = "RegisterPassword";
    const screen_ForgotPassword = "ForgotPassword";
    const screen_OTP = "OTP";
    const closeAll = () => {
        setShowLogin(false);
        setShowRgOtp(false);
        setShowRegister(false);
        setShowRegisterPassword(false);
        setShowForgotPassword(false);
        setShowPM(false);
        setShowLogoutAlert(false);
        setShowRequireLogin(false);
        setShowPopupSaveProject(false);
        setShowForgotOTP(false);
    };

    const onCloseLoginRequire = () => {
        setShowRequireLogin(false);
    };

    const onShowLoginRequire = () => {
        setShowRequireLogin(true);
    };

    const setShow = (screen) => {
        switch (screen) {
            case SCREENS.screen_Login: {
                setShowLogin(true);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);


                break;
            }

            case "Register": {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(true);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);


                break;
            }

            case "RegisterPassword": {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(true);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);

                break;
            }

            case "ForgotPassword": {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(true);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);

                break;
            }
            case "OTP": {
                setShowLogin(false);
                setShowRgOtp(true);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);

                break;
            }

            case "ALL": {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);

                break;
            }

            case SCREENS.screen_PM: {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(true);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);

                break;
            }

            case SCREENS.screen_Logout: {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(true);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);

                break;
            }

            case SCREENS.screen_LoginRequire: {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(true);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);
                break;
            }

            case SCREENS.screen_ForgotOTP: {
                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(false);
                setShowPopupSaveProject(false);
                setShowForgotOTP(true);
                break;
            }

            case SCREENS.screen_SaveProject: {

                if(localStorage.getItem("login")==='true')
                {
                    setShowLogin(false);
                    setShowRgOtp(false);
                    setShowRegister(false);
                    setShowRegisterPassword(false);
                    setShowForgotPassword(false);
                    setShowPM(false);
                    setShowLogoutAlert(false);
                    setShowRequireLogin(false);
                    setShowPopupSaveProject(true);
                    setShowForgotOTP(false);


                }
                else
                {

                setShowLogin(false);
                setShowRgOtp(false);
                setShowRegister(false);
                setShowRegisterPassword(false);
                setShowForgotPassword(false);
                setShowPM(false);
                setShowLogoutAlert(false);
                setShowRequireLogin(true);
                setShowPopupSaveProject(false);
                setShowForgotOTP(false);

                }
                
            }
        }
    };

    return (
        <MediaQuery minWidth={layout.fullSizeMinWidth}>
            {(isFullSize) => {
                const stageSize = resolveStageSize(stageSizeMode, isFullSize);

                if (isPlayerOnly) {
                    return (
                        <StageWrapper
                            isFullScreen={isFullScreen}
                            isRendererSupported={isRendererSupported}
                            isRtl={isRtl}
                            loading={loading}
                            stageSize={STAGE_SIZE_MODES.large}
                            vm={vm}
                        >
                            {alertsVisible ? (
                                <Alerts className={styles.alertsContainer} />
                            ) : null}
                        </StageWrapper>
                    );
                } else {
                    return (
                        <div style={{ width: "100%", height: "100%" }}>
                            <Box
                                className={styles.pageWrapper}
                                dir={isRtl ? "rtl" : "ltr"}
                                {...componentProps}
                            >
                                {telemetryModalVisible ? (
                                    <TelemetryModal
                                        isRtl={isRtl}
                                        isTelemetryEnabled={isTelemetryEnabled}
                                        onCancel={onTelemetryModalCancel}
                                        onOptIn={onTelemetryModalOptIn}
                                        onOptOut={onTelemetryModalOptOut}
                                        onRequestClose={
                                            onRequestCloseTelemetryModal
                                        }
                                        onShowPrivacyPolicy={
                                            onShowPrivacyPolicy
                                        }
                                    />
                                ) : null}
                                {loading ? <Loader /> : null}
                                {isCreating ? (
                                    <Loader messageId="gui.loader.creating" />
                                ) : null}
                                {isRendererSupported ? null : (
                                    <WebGlModal isRtl={isRtl} />
                                )}
                                {tipsLibraryVisible ? <TipsLibrary /> : null}
                                {cardsVisible ? <Cards /> : null}
                                {alertsVisible ? (
                                    <Alerts
                                        className={styles.alertsContainer}
                                    />
                                ) : null}
                                {connectionModalVisible ? (
                                    <ConnectionModal vm={vm} />
                                ) : null}
                                {costumeLibraryVisible ? (
                                    <CostumeLibrary
                                        vm={vm}
                                        onRequestClose={
                                            onRequestCloseCostumeLibrary
                                        }
                                    />
                                ) : null}
                                {backdropLibraryVisible ? (
                                    <BackdropLibrary
                                        vm={vm}
                                        onRequestClose={
                                            onRequestCloseBackdropLibrary
                                        }
                                    />
                                ) : null}
                                <MenuBar
                                    accountNavOpen={accountNavOpen}
                                    authorId={authorId}
                                    authorThumbnailUrl={authorThumbnailUrl}
                                    authorUsername={authorUsername}
                                    canChangeLanguage={canChangeLanguage}
                                    canCreateCopy={canCreateCopy}
                                    canCreateNew={canCreateNew}
                                    canEditTitle={canEditTitle}
                                    canManageFiles={canManageFiles}
                                    canRemix={canRemix}
                                    canSave={canSave}
                                    canShare={canShare}
                                    className={styles.menuBarPosition}
                                    enableCommunity={enableCommunity}
                                    isShared={isShared}
                                    logo={logo}
                                    renderLogin={renderLogin}
                                    showComingSoon={showComingSoon}
                                    onClickAbout={onClickAbout}
                                    onClickAccountNav={onClickAccountNav}
                                    onClickLogo={onClickLogo}
                                    onCloseAccountNav={onCloseAccountNav}
                                    onLogOut={onLogOut}
                                    onOpenRegistration={onOpenRegistration}
                                    onProjectTelemetryEvent={
                                        onProjectTelemetryEvent
                                    }
                                    onSeeCommunity={onSeeCommunity}
                                    //onStoreMyProject = {onStoreMyProject}
                                    onShare={onShare}
                                    onStartSelectingFileUpload={
                                        onStartSelectingFileUpload
                                    }
                                    onToggleLoginOpen={onToggleLoginOpen}
                                    onShowLogin={() => {
                                        setShow(screen_Login);
                                    }}
                                    onShowRegister={() => {
                                        setShow(screen_Register);
                                    }}
                                    onShowScreen={() => {
                                        setShow(screen_Register);
                                    }}
                                    onShowLogout={() => {
                                        setShow(SCREENS.screen_Logout);
                                    }}
                                    onShowPM={() => {
                                        setShow(SCREENS.screen_PM);
                                    }}
                                    onShowSaveProject={() => {
                                        setShow(SCREENS.screen_SaveProject);
                                    }}
                                    onShowLoginRequire={() => {
                                        setShow(SCREENS.screen_LoginRequire);
                                    }}
                                />
                                <Box className={styles.bodyWrapper}>
                                    <Box className={styles.flexWrapper}>
                                        <Box className={styles.editorWrapper}>
                                            <Tabs
                                                forceRenderTabPanel
                                                className={tabClassNames.tabs}
                                                selectedIndex={activeTabIndex}
                                                selectedTabClassName={
                                                    tabClassNames.tabSelected
                                                }
                                                selectedTabPanelClassName={
                                                    tabClassNames.tabPanelSelected
                                                }
                                                onSelect={onActivateTab}
                                            >
                                                <TabList
                                                    className={
                                                        tabClassNames.tabList
                                                    }
                                                >
                                                    <Tab
                                                        className={
                                                            tabClassNames.tab
                                                        }
                                                    >
                                                        <img
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 5,
                                                            }}
                                                            draggable={false}
                                                            src={codeIcon}
                                                        />
                                                        <FormattedMessage
                                                            defaultMessage="Code"
                                                            description="Button to get to the code panel"
                                                            id="gui.gui.codeTab"
                                                        />
                                                    </Tab>
                                                    <Tab
                                                        className={
                                                            tabClassNames.tab
                                                        }
                                                        onClick={
                                                            onActivateCostumesTab
                                                        }
                                                    >
                                                        <img
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 5,
                                                            }}
                                                            draggable={false}
                                                            src={costumesIcon}
                                                        />
                                                        {targetIsStage ? (
                                                            <FormattedMessage
                                                                defaultMessage="Backdrops"
                                                                description="Button to get to the backdrops panel"
                                                                id="gui.gui.backdropsTab"
                                                            />
                                                        ) : (
                                                            <FormattedMessage
                                                                defaultMessage="Costumes"
                                                                description="Button to get to the costumes panel"
                                                                id="gui.gui.costumesTab"
                                                            />
                                                        )}
                                                    </Tab>
                                                    <Tab
                                                        className={
                                                            tabClassNames.tab
                                                        }
                                                        onClick={
                                                            onActivateSoundsTab
                                                        }
                                                    >
                                                        <img
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 5,
                                                            }}
                                                            draggable={false}
                                                            src={soundsIcon}
                                                        />
                                                        <FormattedMessage
                                                            defaultMessage="Sounds"
                                                            description="Button to get to the sounds panel"
                                                            id="gui.gui.soundsTab"
                                                        />
                                                    </Tab>
                                                </TabList>
                                                <TabPanel
                                                    className={
                                                        tabClassNames.tabPanel
                                                    }
                                                >
                                                    <Box
                                                        className={
                                                            styles.blocksWrapper
                                                        }
                                                    >
                                                        <Blocks
                                                            canUseCloud={
                                                                canUseCloud
                                                            }
                                                            grow={1}
                                                            isVisible={
                                                                blocksTabVisible
                                                            }
                                                            options={{
                                                                media: `${basePath}static/blocks-media/`,
                                                            }}
                                                            stageSize={
                                                                stageSize
                                                            }
                                                            vm={vm}
                                                        />
                                                    </Box>
                                                    <Box
                                                        className={
                                                            styles.extensionButtonContainer
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                styles.extensionButton
                                                            }
                                                            title={intl.formatMessage(
                                                                messages.addExtension
                                                            )}
                                                            onClick={
                                                                onExtensionButtonClick
                                                            }
                                                        >
                                                            <img
                                                                className={
                                                                    styles.extensionButtonIcon
                                                                }
                                                                draggable={
                                                                    false
                                                                }
                                                                src={
                                                                    addExtensionIcon
                                                                }
                                                            />
                                                        </button>
                                                    </Box>
                                                    <Box
                                                        className={
                                                            styles.watermark
                                                        }
                                                    >
                                                        <Watermark />
                                                    </Box>
                                                </TabPanel>
                                                <TabPanel
                                                    className={
                                                        tabClassNames.tabPanel
                                                    }
                                                >
                                                    {costumesTabVisible ? (
                                                        <CostumeTab vm={vm} />
                                                    ) : null}
                                                </TabPanel>
                                                <TabPanel
                                                    className={
                                                        tabClassNames.tabPanel
                                                    }
                                                >
                                                    {soundsTabVisible ? (
                                                        <SoundTab vm={vm} />
                                                    ) : null}
                                                </TabPanel>
                                            </Tabs>
                                            {backpackVisible ? (
                                                <Backpack host={backpackHost} />
                                            ) : null}
                                        </Box>

                                        <Box
                                            className={classNames(
                                                styles.stageAndTargetWrapper,
                                                styles[stageSize]
                                            )}
                                        >
                                            <StageWrapper
                                                isFullScreen={isFullScreen}
                                                isRendererSupported={
                                                    isRendererSupported
                                                }
                                                isRtl={isRtl}
                                                stageSize={stageSize}
                                                vm={vm}
                                            />
                                            <Box
                                                className={styles.targetWrapper}
                                            >
                                                <TargetPane
                                                    stageSize={stageSize}
                                                    vm={vm}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <DragLayer />
                            </Box>
                            <div>
                                {showPopupSaveProject ? (
                                    <StoreMyProject closePopup={closeAll}
                                    setShow={setShow}  />
                                ) : (
                                    <div> </div>
                                )}
                            </div>
                            <div>
                            {showRequireLogin ? (
                                <AlertLogin onClosePopup = {closeAll} closePopupFromGUI ={closeAll}
                                  />
                            ) : (
                                <div> </div>
                            )}
                            </div>
                            <div>
                                {showMyProject ? (
                                    <ShowMyProject
                                        showMyProject={showMyProject}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {showLogin ? (
                                    <PopUpLogin
                                        setShow={setShow}
                                        closePopup={closeAll}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {showRegister ? (
                                    <PopUpRegister
                                        setShow={setShow}
                                        closePopup={closeAll}
                                        showRegister={showRegister}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {showRgOtp ? (
                                    <PopUpRegisterOTP
                                        closePopup={closeAll}
                                        setShow={setShow}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {showForgotPassword ? (
                                    <PopupForgotPassword
                                        closePopup={closeAll}
                                        setShow={setShow}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {showRegisterPassword ? (
                                    <PopUpRegisterPassword
                                        closePopup={closeAll}
                                        setShow={setShow}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {showPM ? (
                                    <PopUpProjectManagement
                                        closePopup={closeAll}
                                        setShow={setShow}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {logoutAlert ? (
                                    <PopUpLogout
                                        closePopup={closeAll}
                                        setShow={setShow}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            <div>
                                {showForgotOTP ? (
                                    <PopUpForgotOTP
                                        closePopup={closeAll}
                                        setShow={setShow}
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    );
                }
            }}
        </MediaQuery>
    );
};

GUIComponent.propTypes = {
    accountNavOpen: PropTypes.bool,
    activeTabIndex: PropTypes.number,
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // can be false
    authorThumbnailUrl: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // can be false
    backdropLibraryVisible: PropTypes.bool,
    backpackHost: PropTypes.string,
    backpackVisible: PropTypes.bool,
    basePath: PropTypes.string,
    blocksTabVisible: PropTypes.bool,
    canChangeLanguage: PropTypes.bool,
    canCreateCopy: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canEditTitle: PropTypes.bool,
    canManageFiles: PropTypes.bool,
    canRemix: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    canUseCloud: PropTypes.bool,
    cardsVisible: PropTypes.bool,
    children: PropTypes.node,
    costumeLibraryVisible: PropTypes.bool,
    costumesTabVisible: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    intl: intlShape.isRequired,
    isCreating: PropTypes.bool,
    isFullScreen: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    isShared: PropTypes.bool,
    loading: PropTypes.bool,
    logo: PropTypes.string,
    onActivateCostumesTab: PropTypes.func,
    onActivateSoundsTab: PropTypes.func,
    onActivateTab: PropTypes.func,
    onClickAccountNav: PropTypes.func,
    onClickLogo: PropTypes.func,
    onCloseAccountNav: PropTypes.func,
    onExtensionButtonClick: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    onRequestCloseBackdropLibrary: PropTypes.func,
    onRequestCloseCostumeLibrary: PropTypes.func,
    onRequestCloseTelemetryModal: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    handleClickSaveMyProject: PropTypes.func,
    onShowMyProject: PropTypes.func,
    onShowLogin: PropTypes.func,
    onShowRegister: PropTypes.func,
    onShowScreen: PropTypes.func,
    onShowPM: PropTypes.func,
    onShowSaveProject: PropTypes.func,
    onShowLoginRequire: PropTypes.func,
    onShowLogout: PropTypes.func,
    onStoreMyProject: PropTypes.func,
    onCloseLoginRequire: PropTypes.func,
    soundsTabVisible: PropTypes.bool,
    onShare: PropTypes.func,
    onShowPrivacyPolicy: PropTypes.func,
    onStartSelectingFileUpload: PropTypes.func,
    onTabSelect: PropTypes.func,
    onTelemetryModalCancel: PropTypes.func,
    onTelemetryModalOptIn: PropTypes.func,
    onTelemetryModalOptOut: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    renderLogin: PropTypes.func,
    showComingSoon: PropTypes.bool,

    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    targetIsStage: PropTypes.bool,
    telemetryModalVisible: PropTypes.bool,
    tipsLibraryVisible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired,
};
GUIComponent.defaultProps = {
    backpackHost: null,
    backpackVisible: false,
    basePath: "./",
    canChangeLanguage: true,
    canCreateNew: false,
    canEditTitle: false,
    canManageFiles: true,
    canRemix: false,
    canSave: false,
    canCreateCopy: false,
    canShare: false,
    canUseCloud: false,
    enableCommunity: false,
    isCreating: false,
    isShared: false,
    loading: false,
    showComingSoon: false,
    showMyProject: false,
    storeMyProject: false,
    // showLogin:false,
    // showRegisterOtp:true,
    // showRegister:false,
    stageSizeMode: STAGE_SIZE_MODES.large,
};

const mapStateToProps = (state) => ({
    // This is the button's mode, as opposed to the actual current state
    stageSizeMode: state.scratchGui.stageSize.stageSize,
});

export default injectIntl(connect(mapStateToProps)(GUIComponent));
