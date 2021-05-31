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
import   '../../lib/sb-file-uploader-hoc.jsx';

import Grid from "@material-ui/core/Grid";
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from "react-intl";
import MenuBarHOC from "../../containers/menu-bar-hoc.jsx";
import { SCREENS } from "../gui/constant.js";
import ProjectDetail from "./project-detail.jsx";
import AlertLogin from "../gui/alert-login.jsx";

require("./bootstrap.min.css");

import "./bootstrap.min.css";

import UploadProject from "../storemyproject/upload-project.js";
class PopUpProjectManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: 1,
        };

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
        ]);
        this.state = {
            isDetail: false,
            showAlertLogin: false,
            showUploadProject: false,
        };

        this.state = { spacing: 2, arrayItems: [] };
        const arrayProject = [];
        const arrayProjectTemp = [];
        for (var i = 0; i < 15; i++) {
           // arrayProject.push({ name: "Dinh Dong", project: "ABC" });
        }
        this.state = { arrayProject };
        this.state = {arrayProjectTemp};
        this.onShowDetail = this.onShowDetail.bind(this);

        this.onSearchProject = this.onSearchProject.bind(this);
    }

    // componentDidMount() {
    // var url = "https://dev.teky.asia/v1/code_kittens_api/projects";
    // console.log("jsonStringFormData1");
    //  const formData = new FormData();
    //  formData.append("page",1);
    //  fetch(url, {
    //         method: "GET",
    //         body:formData
    //     })
    //         .then((res) => res.json)
    //         .then(
    //             (result) => {

    //                 console.log("jsonStringFormData2");

    //                 console.log("Result", JSON.stringify(result));
    //                  const value = result.message;
    //                  if (value.status_code == 200) {
    //                      this.setState({ arrayProject: result.data });
    //                      console.log("arrayProjectJson", result.data);
    //                  }
    //             },
    //             (error) => {}
    //         );
    // }

    componentDidMount() {
        fetch('https://dev.teky.asia/v1/code_kittens_api/projects')
        .then((response) => response.json())
        .then(result => {
        console.log("result",result)
        const value = result.message;
                if (value.status_code == 200) {
                    this.setState({ arrayProject: result.data });
                    this.setState({ arrayProjectTemp: result.data });
                    console.log("arrayProjectJson", result.data);
                }
        });
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    handleSelected(selectedPage) {
        console.log("selected", selectedPage);
        this.setState({ selectedPage: selectedPage });
    }

    handleChange(event) {
        setSpacing(Number(event.target.value));
    }
    onShowDetail(name, description, created_by) 
    {
          console.log("showDetailCCCC");
          localStorage.setItem("name", name);
          localStorage.setItem("description", description);
          localStorage.setItem("created_by", created_by);
          this.setState({ isDetail: true });

    }

    onSearchProject(e)
    {

        const text = e.target.value;

        console.log("search", text);

        this.setState({arrayProjectTemp:[]})

        var arrayProjectSearch = [];

        for (var i =0;i<this.state.arrayProject.length;i++)
        {
            const temp = this.state.arrayProject[i];

            if (temp.name.includes(text))
            {

                arrayProjectSearch.push(temp);

            }

        }

        if(text !== '')
        {
            this.setState({arrayProjectTemp:arrayProjectSearch})


        }else
        {

            this.setState({arrayProjectTemp:this.state.arrayProject})

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
        console.log("onClosePopupDetail");

        this.setState({ isDetail: false });
    }

    onRemix() {
        this.props.closePopup();
        const link_download = 'https://dev.teky.asia/v1/code_kittens_api/projects/908d9c64-7ffa-4624-8db1-03962879b8cf'
        //'https://sgp1.digitaloceanspaces.com/devlms/teky20/media/code-kitten/projects/files/Scratch_Project_BGD.sb3';
        fetch(link_download).then(res => {
            const bufferArray = res.arrayBuffer().readas;
            //this.props.vm.loadProject(bufferArray)
            //onLoadProject(bufferArray);
            // this.props.vm
            // .loadProject(bufferArray)
          });
    }
    closePopup() {
        console.log("Close Popup");
        this.props.closePopup();
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
    render() {
        return (
            <Modal


                style={{width:'100%'}}
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
                            height: "700px",
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

                        <div id="div5"
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
                                    height: "100px",
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
                                            height: "50px",
                                            borderColor: "#000000",
                                            borderRadius: "25px",
                                            borderWidth: 5,
                                            marginRight: "20px",
                                            backgroundColor: "#FFF",
                                        }}
                                    >
                                        <input onChange = {this.onSearchProject}
                                            className={styles.input_search}
                                            style={{
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
                                    style={{
                                        display: "flex",
                                        alignContent: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        color: "#FFF",
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        flex: 1,
                                        width: "150px",
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        height: "50px",
                                        marginRight: "50px",
                                        background: "#1CC3A5",
                                        alignSelf: "center",
                                        borderColor: "#1CC3A5",
                                        alignContent: "flex-end",
                                        borderRadius: "25px",
                                    }}
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
                                                this.printButtonLabel
                                            }
                                        />
                                    ) : (
                                        <ButtonGroup
                                            buttons={["Dự án cộng đồng"]}
                                            doSomethingAfterClick={
                                                this.printButtonLabel
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
                                        <span>Tổng cộng có {this.state.arrayProjectTemp.length} dự án </span>
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
                                                                onClick={
                                                                   () => this
                                                                        .onShowDetail(value.name, value.description, value.created_by)
                                                                        //() => this.handleSort(column)
                                                                        
                                                                       
                                                                }
                                                            >
                                                                <ProjectItem description = {value.description} name= {value.name} thumb = {value.thumbnail_base64} linkdownload= {'https://dev.teky.asia/v1/code_kittens_api/projects/'+ value.id} />
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
                                        height: "50px",
                                        display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        marginTop: "0px",
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
                                            style={{
                                                alignSelf: "center",
                                                width: "50px",
                                                display: "flex",
                                                height: "30px",
                                                justifyContent: "center",
                                                backgroundColor: "#1CC3A5",
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
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "center",
                                                width: "50px",
                                                height: "30px",
                                                backgroundColor: "#1CC3A5",
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
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "center",
                                                width: "100px",
                                                height: "30px",
                                                backgroundColor: "#1CC3A5",
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
                                                Trang 1/100
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "center",
                                                width: "50px",
                                                height: "30px",
                                                backgroundColor: "#1CC3A5",
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
                                            style={{
                                                justifyContent: "center",
                                                display: "flex",

                                                alignSelf: "center",
                                                width: "50px",
                                                height: "30px",
                                                backgroundColor: "#1CC3A5",
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
        loadProject: PropTypes.func
    })
};

const mapDispatchToProps = (dispatch) => ({
    // closeLogin: () => dispatch(setShowLogin(false)),
});
const mapStateToProps = (state, ownProps) => {
    return null;
};

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(null, mapDispatchToProps)
)(PopUpProjectManagement);
