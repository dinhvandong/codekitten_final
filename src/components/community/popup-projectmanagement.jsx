import { flex } from "to-style/src/prefixProperties";
import bindAll from "lodash.bindall";
import styles from "./community.css";
import icon_add from "./add-codekitten.svg";
import icon_pagging_next from "./pagging_next.png";
import ic_next from "./ic_next.png";
import ic_back from "./ic_back.png";
import icon_pagging_previous from "./pagging_previous.png";

import ButtonGroup from "./libs/ButtonGroup.js";
import React from "react";
import Modal from "react-awesome-modal";
import iconExit from "./btnClose.png";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import ProjectItem from "./project-item.jsx";
import "../../lib/sb-file-uploader-hoc.jsx";
import { setProjectTitle } from "../../reducers/project-title";
import Grid from "@material-ui/core/Grid";
import ProjectDeleteQuestion from "./project-delete.jsx";
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from "react-intl";
import MenuBarHOC from "../../containers/menu-bar-hoc.jsx";

import "./empty-cache";
import SBFileUploaderHOC from "../../lib/sb-file-uploader-hoc.jsx";

import { SCREENS } from "../gui/constant.js";
import ProjectDetail from "./project-detail.jsx";
import AlertLogin from "../gui/alert-login.jsx";

require("./bootstrap.min.css");

import "./bootstrap.min.css";

import UploadProject from "../storemyproject/upload-project.js";
import ConfigServer from "../../config_server.js";
import styles2 from "./popup-projectmanagement.css";

import {
    openLoadingProject,
    closeLoadingProject,
} from "../../../src/reducers/modals";
//'../reducers/modals';
//const fs = require('fs');

import {
    LoadingStates,
    getIsLoadingUpload,
    getIsShowingWithoutId,
    onLoadedProject,
    requestProjectUpload,
} from "../../../src/reducers/project-state";

class PopUpProjectManagement extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelected = this.handleSelected.bind(this);

        bindAll(this, [
            "closePopup",
            "onShowLoginAlert",

            "onCloseLoginAlert",
            "onShowUploadProject",
            "onCloseUploadProject",
            "onChangePage",
            "onClosePopupDetail",
            "onRemix",
            "clickTab",
            "onChangeTab",
        ]);
        this.state = {
            isDetail: false,
            isDelete: false,
            showAlertLogin: false,
            showUploadProject: false,
            selectedTab: 0,
        };

        this.state = { spacing: 2, arrayItems: [] };

        this.state = {
            arrayProjectPublic: [],
            arrayProjectPublicTemp: [],
            arrayProject: [],
            isLoad: false,
            arrayMyProject: [],
            arrayProjectTemp: [],
            arrayMyProjectTemp: [],
            selectedPage: 1,
            selectedPage1: 1,

            selectedPage2: 1,
            pageSize: 50,

            pageSize1: 50,
            pageSize2: 50,
            pageTotal: 0,
            pageTotal1: 0,
            pageTotal2: 0,
        };

        this.onShowDetail = this.onShowDetail.bind(this);
        localStorage.setItem("clicktab", 0);

        this.onConfirmDeleteProject = this.onConfirmDeleteProject.bind(this);
        this.onSearchProject = this.onSearchProject.bind(this);
        this.onRefreshNext = this.onRefreshNext.bind(this);
        this.onRefreshPrevious = this.onRefreshPrevious.bind(this);
        this.onRefresh = this.onRefresh.bind(this);

        this.onDeleteProject = this.onDeleteProject.bind(this);
        this.onSetShowDetail = this.onSetShowDetail.bind(this);

        this.onCloseDeleteProject = this.onCloseDeleteProject.bind(this);

        this.emptyCache = this.emptyCache.bind(this);
        this.removeFileObjects = this.removeFileObjects.bind(this);
        this.onPreviousPage = this.onPreviousPage.bind(this);
        this.onNextPage = this.onNextPage.bind(this);
        this.onGoStartPage = this.onGoStartPage.bind(this);
        this.onGoEndPage = this.onGoEndPage.bind(this);
    }

    onGoStartPage()
    {

        const clickTab = localStorage.getItem("clicktab");
        if (clickTab == 0) {
            this.setState({ selectedPage1: 1 });
            this.setState({pageCurrent:1});

            this.onRefreshStartPage();
        } else {
            this.setState({ selectedPage2: 1 });
            this.setState({pageCurrent:1});

            this.onRefreshStartPage();
        }
    }

    onGoEndPage()
    {

        const clickTab = localStorage.getItem("clicktab");
        if (clickTab == 0) {
           

            this.setState({ selectedPage1: this.state.pageTotal1 });
            this.setState({pageCurrent:this.state.pageTotal1});
            this.onRefreshEndPage();

           
        } else {
            //const pageCurrent = this.state.selectedPage2;

            this.setState({ selectedPage2: this.state.pageTotal2 });
            this.setState({pageCurrent:this.state.pageTotal2});
            this.onRefreshEndPage();
        }



    }
    onPreviousPage() {
        const clickTab = localStorage.getItem("clicktab");
        if (clickTab == 0) {
            const pageCurrent = this.state.selectedPage1;

            if (pageCurrent > 1) {
                this.setState({ selectedPage1: pageCurrent - 1 });

                this.onRefreshPrevious();
            }
        } else {
            const pageCurrent = this.state.selectedPage2;
            if (pageCurrent > 1) {
                this.setState({ selectedPage2: pageCurrent - 1 });
                this.onRefreshPrevious();
            }
        }
    }

    onNextPage() {
        const clickTab = localStorage.getItem("clicktab");
        if (clickTab == 0) {
            const pageCurrent = this.state.selectedPage1;
            console.log("pageCurrent",pageCurrent);

            if (pageCurrent < this.state.pageTotal1) {
                this.setState({ selectedPage1: (pageCurrent + 1) });
                console.log("Next Page", this.state.selectedPage1 )
                this.onRefreshNext();
            }
        } else {
            const pageCurrent = this.state.selectedPage2;
            if (pageCurrent < this.state.pageTotal2) {
                this.setState({ selectedPage2: (pageCurrent + 1) });
                this.onRefreshNext();
            }
        }
    }

    onRefreshNext() {
        const clickTab = localStorage.getItem("clicktab");

        if (clickTab == 0) {
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/projects?page=" +
                    (this.state.selectedPage1 + 1) +
                    "&per_page=" +
                    this.state.pageSize1
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log("componentDidMount00:", result.message);

                    const value = result.message;
                    if (value.status_code == 200) {
                        console.log("arrayProjectPublic", result);
                        this.setState({
                            arrayProjectPublic: result.data.projects,
                        });
                        this.setState({
                            arrayProjectPublicTemp: result.data.projects,
                        });

                        this.setState({ pageTotal1: result.data.total_page });
                        this.onChangeTab();
                    }
                });
        } else {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/my_projects?page=" +
                    (this.state.selectedPage2 + 1 ) + 
                    "&per_page=" +
                    this.state.pageSize2,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    const value = result.message;
                    if (value.status_code == 200) {
                        this.setState({ arrayMyProject: result.data.projects });
                        this.setState({
                            arrayMyProjectTemp: result.data.projects,
                        });
                        this.onChangeTab();
                        this.setState({ pageTotal2: result.data.total_page });
                    }
                });
        }
    }




    onRefreshPrevious() {
        const clickTab = localStorage.getItem("clicktab");

        if (clickTab == 0) {
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/projects?page=" +
                    (this.state.selectedPage1 - 1) +
                    "&per_page=" +
                    this.state.pageSize1
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log("componentDidMount00:", result.message);

                    const value = result.message;
                    if (value.status_code == 200) {
                        console.log("arrayProjectPublic", result);
                        this.setState({
                            arrayProjectPublic: result.data.projects,
                        });
                        this.setState({
                            arrayProjectPublicTemp: result.data.projects,
                        });

                        this.setState({ pageTotal1: result.data.total_page });
                        this.onChangeTab();
                    }
                });
        } else {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/my_projects?page=" +
                    (this.state.selectedPage2 - 1 ) + 
                    "&per_page=" +
                    this.state.pageSize2,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    const value = result.message;
                    if (value.status_code == 200) {
                        this.setState({ arrayMyProject: result.data.projects });
                        this.setState({
                            arrayMyProjectTemp: result.data.projects,
                        });
                        this.onChangeTab();
                        this.setState({ pageTotal2: result.data.total_page });
                    }
                });
        }
    }



    onRefreshEndPage() {
        const clickTab = localStorage.getItem("clicktab");
        if (clickTab == 0) {

            console.log("pageTotal1",this.state.pageTotal1);
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/projects?page=" +
                    (this.state.pageTotal1) +
                    "&per_page=" +
                    this.state.pageSize1
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log("componentDidMount00:", result.message);

                    const value = result.message;
                    if (value.status_code == 200) {
                        console.log("arrayProjectPublic", result);
                        this.setState({
                            arrayProjectPublic: result.data.projects,
                        });
                        this.setState({
                            arrayProjectPublicTemp: result.data.projects,
                        });

                        this.setState({ pageTotal1: result.data.total_page });
                        this.onChangeTab();
                    }
                });
        } else {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/my_projects?page=" +
                    (this.state.pageTotal2) + 
                    "&per_page=" +
                    this.state.pageSize2,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    const value = result.message;
                    if (value.status_code == 200) {
                        this.setState({ arrayMyProject: result.data.projects });
                        this.setState({
                            arrayMyProjectTemp: result.data.projects,
                        });
                        this.onChangeTab();
                        this.setState({ pageTotal2: result.data.total_page });
                    }
                });
        }
    }


    onRefreshStartPage() {
        const clickTab = localStorage.getItem("clicktab");

        if (clickTab == 0) {
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/projects?page=" +
                    1 +
                    "&per_page=" +
                    this.state.pageSize1
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log("componentDidMount00:", result.message);

                    const value = result.message;
                    if (value.status_code == 200) {
                        console.log("arrayProjectPublic", result);
                        this.setState({
                            arrayProjectPublic: result.data.projects,
                        });
                        this.setState({
                            arrayProjectPublicTemp: result.data.projects,
                        });

                        this.setState({ pageTotal1: result.data.total_page });
                        this.onChangeTab();
                    }
                });
        } else {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/my_projects?page=" +
                    1 + 
                    "&per_page=" +
                    this.state.pageSize2,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    const value = result.message;
                    if (value.status_code == 200) {
                        this.setState({ arrayMyProject: result.data.projects });
                        this.setState({
                            arrayMyProjectTemp: result.data.projects,
                        });
                        this.onChangeTab();
                        this.setState({ pageTotal2: result.data.total_page });
                    }
                });
        }
    }


    onRefresh() {
        const clickTab = localStorage.getItem("clicktab");

        if (clickTab == 0) {
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/projects?page=" +
                    (this.state.selectedPage1) +
                    "&per_page=" +
                    this.state.pageSize1
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log("componentDidMount00:", result.message);

                    const value = result.message;
                    if (value.status_code == 200) {
                        console.log("arrayProjectPublic", result);
                        this.setState({
                            arrayProjectPublic: result.data.projects,
                        });
                        this.setState({
                            arrayProjectPublicTemp: result.data.projects,
                        });

                        this.setState({ pageTotal1: result.data.total_page });
                        this.onChangeTab();
                    }
                });
        } else {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            fetch(
                ConfigServer.host +
                    "/code_kittens_api/my_projects?page=" +
                    (this.state.selectedPage2) + 
                    "&per_page=" +
                    this.state.pageSize2,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    const value = result.message;
                    if (value.status_code == 200) {
                        this.setState({ arrayMyProject: result.data.projects });
                        this.setState({
                            arrayMyProjectTemp: result.data.projects,
                        });
                        this.onChangeTab();
                        this.setState({ pageTotal2: result.data.total_page });
                    }
                });
        }
    }
    componentDidMount() {
        console.log("componentDidMount1:", this.state.pageSize);
        console.log("componentDidMount2:", this.state.selectedPage);

        localStorage.setItem("clicktab", 0);

        fetch(
            ConfigServer.host +
                "/code_kittens_api/projects?page=" +
                this.state.selectedPage +
                "&per_page=" +
                this.state.pageSize
        )
            .then((response) => response.json())
            .then((result) => {
                console.log("componentDidMount00:", result.message);

                const value = result.message;
                if (value.status_code == 200) {
                    console.log("arrayProjectPublic", result);
                    this.setState({ arrayProjectPublic: result.data.projects });
                    this.setState({
                        arrayProjectPublicTemp: result.data.projects,
                    });

                    this.setState({ pageTotal1: result.data.total_page });
                    this.onChangeTab();
                }
            });
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        fetch(
            ConfigServer.host +
                "/code_kittens_api/my_projects?page=" +
                this.state.selectedPage +
                "&per_page=" +
                this.state.pageSize,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                const value = result.message;
                if (value.status_code == 200) {
                    this.setState({ arrayMyProject: result.data.projects });
                    this.setState({ arrayMyProjectTemp: result.data.projects });
                    this.onChangeTab();
                    this.setState({ pageTotal2: result.data.total_page });
                }
            });
    }
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    handleSelected(selectedPage) {
        this.setState({ selectedPage: selectedPage });
    }

    handleChange(event) {
        setSpacing(Number(event.target.value));
    }

    onSetShowDetail() {
        this.setState({ isDetail: true });
    }
    onShowDetail(
        name,
        description,
        created_by,
        id,
        thumbnail_base64,
        thumbnail,
        is_public
    ) {
        localStorage.setItem("name", name);
        localStorage.setItem("description", description);
        localStorage.setItem("created_by", created_by);
        localStorage.setItem(
            "link_download",
            ConfigServer.host + "/code_kittens_api/projects/" + id
        );
        localStorage.setItem("id_project_selected", id);
        localStorage.setItem("thumbnail_base64", thumbnail_base64);
        localStorage.setItem("thumbnail", thumbnail);
        localStorage.setItem("is_public", is_public);

        var x = 0;
        localStorage.setItem("update_project", false);

        for (x = 0; x < this.state.arrayMyProject.length; x++) {
            const item = this.state.arrayMyProject[x];
            if (item.id == id) {
                localStorage.setItem("update_project", true);
            }
        }

        // this.setState({ isDetail: true });
    }

    onDeleteProject() {
        this.setState({ isDelete: true });
    }

    onCloseDeleteProject() {
        this.setState({ isDelete: false });
    }

    onSearchProject(e) {
        const text = e.target.value;
        this.setState({ arrayProjectTemp: [] });
        var arrayProjectSearch = [];
        for (var i = 0; i < this.state.arrayProject.length; i++) {
            const temp = this.state.arrayProject[i];

            if (temp.name.includes(text)) {
                arrayProjectSearch.push(temp);
            }
        }

        if (text !== "") {
            this.setState({ arrayProjectTemp: arrayProjectSearch });
        } else {
            this.setState({ arrayProjectTemp: this.state.arrayProject });
        }
    }

    onCloseLoginAlert() {
        this.setState({ showAlertLogin: false });
    }
    onCloseUploadProject() {
        this.setState({ showUploadProject: false });
    }
    onShowLoginAlert() {
        var check = !this.state.showAlertLogin;
        this.setState({ showAlertLogin: check });
    }
    onShowUploadProject() {
        this.setState({ showUploadProject: true });
    }
    onClosePopupDetail() {
        this.setState({ isDetail: false });
    }

    removeFileObjects() {
        if (this.inputElement) {
            this.inputElement.value = null;
            document.body.removeChild(this.inputElement);
        }
        this.inputElement = null;
    }

    emptyCache() {
        if ("caches" in window) {
            caches.keys().then((names) => {
                // Delete all the cache files
                names.forEach((name) => {
                    caches.delete(name);
                });
            });

            // Makes sure the page reloads. Changes are only visible after you refresh.
            //window.location.reload(true);
        }
    }

    onRemix(e) {
        /*
         localStorage.setItem("name", name);
        localStorage.setItem("description", description);
        localStorage.setItem("created_by", created_by);
        localStorage.setItem(
            "link_download",
            ConfigServer.host + "/code_kittens_api/projects/" + id
        );
        localStorage.setItem("id_project_selected", id);
        localStorage.setItem("thumbnail_base64", thumbnail_base64);
        localStorage.setItem("thumbnail", thumbnail);
        
        */
        let loadingSuccess = false;
        this.props.onLoadingStarted();
        if (!this.loadingSuccess) {
            const link_download = localStorage.getItem("link_download");
            this.setState({ fileupload: null });
            // this.emptyCache();
            fetch(link_download)
                .then((r) => r.arrayBuffer())
                .then((buffer) => {
                    console.log("upload_project:", 0);
                    // this.setState({fileupload: buffer});
                    const file = buffer;
                    console.log("upload_project:", 1);

                    console.log("upload_project:", 2);

                    if (!loadingSuccess) {
                        this.props.vm
                            .loadProject(buffer)
                            .then(() => {
                                if (!loadingSuccess) {
                                    //localStorage.setItem("update_project", true);
                                    //id_project_selected
                                    console.log("upload_project:", 1);
                                    this.props.onSetProjectTitle(
                                        "title Project"
                                    );
                                    loadingSuccess = true;
                                }
                            })
                            .catch((error) => {})
                            .then(() => {
                                this.props.onCloseLoadingStarted();
                                //this.props.onLoadingFinished(this.props.loadingState, loadingSuccess);
                            });
                    }
                });

            this.props.closePopup();
        }
    }

    onRemix2() {
        const link_download = localStorage.getItem("link_download");
        fetch(link_download)
            .then((r) => r.arrayBuffer())
            .then((buffer) => {
                this.props.vm
                    .loadProject(buffer)
                    .then(() => {
                        if (true) {
                            this.props.onSetProjectTitle("title Project");
                        }
                    })
                    .catch((error) => {})
                    .then(() => {});
            });

        // this.props.closePopup();
    }

    onConfirmDeleteProject() {
        const id_project = localStorage.getItem("id_project_selected");
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        fetch(
            ConfigServer.host + "/code_kittens_api/projects/" + id_project,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                const value = result.message;
                if (value.status_code == 200) {
                    this.onRefresh();
                    this.onCloseDeleteProject();
                }
            });
    }

    clickTab(e) {}
    closePopup() {
        this.props.closePopup();
        //this.onRemix();
    }
    onGoforgotPassword() {
        setShow(SCREENS.screen_ForgotPassword);
    }
    convertStringtoDate(dateString) {
        return new Date(dateString);
    }
    formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    toArrayBuffer(buffer) {
        var ab = new ArrayBuffer(buffer.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }
        return ab;
    }

    convertUTCDateToLocalDate(date) {
        var newDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60 * 1000
        );
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    }

    onChangeTab() {
        const clickTab = localStorage.getItem("clicktab");
        if (clickTab == 0) {
            this.setState({ arrayProject: this.state.arrayProjectPublic });
            this.setState({ arrayProjectTemp: this.state.arrayProjectPublic });
            this.setState({ selectedPage: this.state.selectedPage1 });
            this.setState({ pageTotal: this.state.pageTotal1 });
        } else {
            this.setState({ arrayProject: this.state.arrayMyProject });
            this.setState({ arrayProjectTemp: this.state.arrayMyProject });
            this.setState({ selectedPage: this.state.selectedPage2 });
            this.setState({ pageTotal: this.state.pageTotal2 });
        }
    }
    render() {
        const {
            /* eslint-disable no-unused-vars */
            loadingState,
            requestProjectUpload: requestProjectUploadProp,
            /* eslint-enable no-unused-vars */
            ...componentProps
        } = this.props;

        return (
            <Modal
                style={{ width: "100%" }}
                id="modal"
                name="modal"
                visible={true}
                effect="fadeInUp"
                onClickAway={() => this.closeModal()}
            >
                <view
                    id="viewid"
                    style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: "transparent",
                        width: "100%",
                        margin: 0,
                        padding: 0,
                        top: 0,
                        left: 0,
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <div
                        id="main"
                        style={{
                            width: "100%",
                            padding: "20px",
                            height: "90%",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            display: flex,
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: -40,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: "transparent",
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                height: 40,
                            }}
                        >
                            <text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    alignSelf: "center",
                                    color: "white",
                                    height: "100%",
                                    width: "100%",
                                    marginTop: 25,
                                }}
                            ></text>

                            <img
                                onClick={this.closePopup}
                                style={{
                                    zIndex: 100,
                                    marginRight: 5,
                                    width: 25,
                                    height: 25,
                                    alignSelf: "center",
                                }}
                                src={iconExit}
                            />
                        </div>

                        <div
                            id="div5"
                            style={{
                                width: "100%",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                display: "flex",
                                borderRadius: "20px",
                                alignContent: "flex-start",
                                alignItems: "flex-start",
                                height: "100%",
                                backgroundColor: "#454545",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignSelf: "center",
                                    height: "70px",
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                    background: "#1CC3A5",
                                    backgroundImage:
                                        "linear-gradient(to right,#1CC3A5, #F9F154)",
                                }}
                            >
                                <div style={{ width: "100%", flex: 7 }}></div>

                                <div
                                    style={{
                                        flex: 3,
                                        alignSelf: "center",
                                        marginRight: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            height: "45px",
                                            borderColor: "#000000",
                                            borderRadius: "15px",
                                            borderWidth: "5px",
                                            marginRight: "20px",
                                            backgroundColor: "#FFF",
                                        }}
                                    >
                                        <input
                                            onChange={this.onSearchProject}
                                            className={styles.input_search}
                                            style={{
                                                fontWeight: "lighter",
                                                flex: 10,
                                                width: "100%",
                                                marginLeft: "20px",
                                                marginRight: "10px",
                                                alignSelf: "center",
                                            }}
                                            placeholder="Tìm kiếm dự án"
                                        />
                                        <div
                                            className={
                                                styles.ico_search_codekitten
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={
                                        localStorage.getItem("login") === "true"
                                            ? this.onShowUploadProject
                                            : this.onShowLoginAlert
                                    }
                                    className={styles2.buttonAddProject}
                                >
                                    <div style={{ alignSelf: "center" }}>
                                        {" "}
                                        <img
                                            style={{ alignSelf: "center" }}
                                            src={icon_add}
                                        />
                                    </div>{" "}
                                    <a
                                        style={{
                                            alignSelf: "center",
                                            marginLeft: "5px",
                                        }}
                                    >
                                        Đăng dự án{" "}
                                    </a>{" "}
                                </button>
                            </div>

                            <div style={{ marginTop: "-95px" }}>
                                <ul className={styles.tabs}>
                                    {localStorage.getItem("login") == "true" ? (
                                        <ButtonGroup
                                            buttons={[
                                                "Dự án cộng đồng",
                                                "Dự án của tôi",
                                            ]}
                                            doSomethingAfterClick={
                                                this.onChangeTab
                                            }
                                        />
                                    ) : (
                                        <ButtonGroup
                                            buttons={["Dự án cộng đồng"]}
                                            doSomethingAfterClick={
                                                this.onChangeTab
                                            }
                                        />
                                    )}
                                </ul>
                            </div>

                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderBottomLeftRadius: "10px",
                                    borderBottomRightRadius: "10px",
                                    backgroundColor: "#FFF",
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: "30px",
                                        marginLeft: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 16,
                                        }}
                                    >
                                        <span>Toàn bộ dự án </span>
                                    </div>

                                    <div
                                        style={{
                                            fontWeight: "normal",
                                            fontSize: 14,
                                            marginTop: "10px",
                                        }}
                                    >
                                        <span>
                                            Tìm thấy{" "}
                                            {this.state.arrayProjectTemp.length}{" "}
                                            dự án{" "}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        width: "100%",
                                        height: "526px",
                                        overflowY: "scroll",
                                    }}
                                >
                                    <Grid
                                        container
                                        style={{ zIndex: 1, flexGrow: 1 }}
                                        spacing={10}
                                    >
                                        <Grid item xs={20}>
                                            <Grid
                                                container
                                                justify="center"
                                                spacing={this.state.spacing}
                                            >
                                                {this.state.arrayProjectTemp.map(
                                                    (value) => (
                                                        <Grid key={value} item>
                                                            <div
                                                                onClick={() =>
                                                                    this.onShowDetail(
                                                                        value.name,
                                                                        value.description,
                                                                        value.created_by,
                                                                        value.id,
                                                                        value.thumbnail_base64,
                                                                        value.thumbnail,
                                                                        value.is_public
                                                                    )
                                                                }
                                                            >
                                                                <ProjectItem
                                                                    onSetShowDetail={
                                                                        this
                                                                            .onSetShowDetail
                                                                    }
                                                                    onDeleteProject={
                                                                        this
                                                                            .onDeleteProject
                                                                    }
                                                                    isPublic={localStorage.getItem(
                                                                        "clicktab"
                                                                    )}
                                                                    description={
                                                                        value.description
                                                                    }
                                                                    name={
                                                                        value.name
                                                                    }
                                                                    thumb={
                                                                        value.thumbnail
                                                                    }
                                                                    linkdownload={
                                                                        ConfigServer.host +
                                                                        "/code_kittens_api/projects/" +
                                                                        value.id
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                    )
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div
                                    style={{
                                        width: "100%",
                                        height: "30px",
                                        display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        borderBottomLeftRadius: "10px",
                                        borderBottomRightRadius: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            width: "100%",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                         onClick={this.onGoStartPage}
                                            className={styles2.buttonPage}
                                            style={{
                                                alignSelf: "flex-end",
                                                width: "50px",
                                                display: "flex",
                                                height: "30px",
                                                justifyContent: "center",
                                                borderColor: "white",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    alignSelf: "center",
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                src={icon_pagging_previous}
                                            />
                                        </div>

                                        <div
                                            className={styles2.buttonPage}
                                            onClick={this.onPreviousPage}
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "flex-end",
                                                width: "50px",
                                                height: "30px",
                                                borderColor: "white",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    alignSelf: "center",
                                                    width: "10px",
                                                    height: "10px",
                                                }}
                                                src={ic_back}
                                            />
                                        </div>

                                        <div
                                            className={styles2.buttonPage}
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "flex-end",
                                                width: "100px",
                                                height: "30px",
                                                borderColor: "white",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    alignSelf: "center",
                                                    fontWeight: "bold",
                                                    color: "white",
                                                    fontSize: 12,
                                                }}
                                            >
                                                Trang {this.state.selectedPage}/{" "}
                                                {this.state.pageTotal}
                                            </span>
                                        </div>

                                        <div
                                            className={styles2.buttonPage}
                                            onClick={this.onNextPage}
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "flex-end",
                                                width: "50px",
                                                height: "30px",
                                                borderColor: "white",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    alignSelf: "center",
                                                    width: "10px",
                                                    height: "10px",
                                                }}
                                                src={ic_next}
                                            />
                                        </div>

                                        <div
                                        onClick={this.onGoEndPage}

                                            className={styles2.buttonPage}
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "flex-end",
                                                width: "50px",
                                                height: "30px",
                                                borderColor: "white",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <img
                                                style={{
                                                    alignSelf: "center",
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                src={icon_pagging_next}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        marginTop: "30px",
                                        zIndex: 5,
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    {this.state.isDetail ? (
                                        <ProjectDetail
                                            onRemix={this.onRemix}
                                            onClosePopup={
                                                this.onClosePopupDetail
                                            }
                                        />
                                    ) : (
                                        <div></div>
                                    )}

                                    {this.state.isDelete === true ? (
                                        <ProjectDeleteQuestion
                                            onCloseDelete={
                                                this.onCloseDeleteProject
                                            }
                                            onDeleteProject={
                                                this.onConfirmDeleteProject
                                            }
                                        />
                                    ) : (
                                        <div></div>
                                    )}
                                </div>

                                <div
                                    style={{
                                        marginTop: "30px",
                                        zIndex: 5,
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    {this.state.showAlertLogin ? (
                                        <AlertLogin
                                            onClosePopup={
                                                this.onCloseLoginAlert
                                            }
                                        />
                                    ) : (
                                        <div></div>
                                    )}
                                </div>

                                <div
                                    style={{
                                        marginTop: "30px",
                                        zIndex: 5,
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    {this.state.showUploadProject ? (
                                        <UploadProject
                                            onRefresh={this.onRefresh}
                                            onClosePopup={
                                                this.onCloseUploadProject
                                            }
                                        />
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </view>
            </Modal>
        );
    }
}

PopUpProjectManagement.propTypes = {
    //closeLogin: PropTypes.func,
    closePopup: PropTypes.func,
    setShow: PropTypes.func,
    vm: PropTypes.shape({
        loadProject: PropTypes.func,
    }),
    onSetProjectTitle: PropTypes.func,
    onLoadingFinished: PropTypes.func,
    onCloseLoadingStarted: PropTypes.func,
    requestProjectUpload: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // closeLogin: () => dispatch(setShowLogin(false)),
    onLoadingStarted: () => dispatch(openLoadingProject()),
    onCloseLoadingStarted: () => dispatch(closeLoadingProject()),
    onLoadingFinished: (loadingState, success) => {
        dispatch(onLoadedProject(loadingState, ownProps.canSave, success));
        dispatch(closeLoadingProject());
        dispatch(closeFileMenu());
    },
    requestProjectUpload: (loadingState) =>
        dispatch(requestProjectUpload(loadingState)),

    onSetProjectTitle: (title) => dispatch(setProjectTitle(title)),
});
const mapStateToProps = (state, ownProps) => {
    return {
        vm: state.scratchGui.vm,
    };
};
const mergeProps = (stateProps, dispatchProps, ownProps) =>
    Object.assign({}, stateProps, dispatchProps, ownProps);
export default compose(
    injectIntl,
    MenuBarHOC,
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(PopUpProjectManagement);
