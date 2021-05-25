import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";

import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { flex } from "to-style/src/prefixProperties";
import { ButtonToolbar } from "react-bootstrap";
import { Popup } from "reactjs-popup";
import bindAll from "lodash.bindall";
//myproject.css";
import styles from "./community.css";
import icon_add from "./add-codekitten.svg";

import ButtonGroup from "./libs/ButtonGroup.js";
import ProjectList from "./project-list.jsx";
import "reactjs-popup/dist/index.css";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "../gui/ic_cat.svg";
import iconExit from "./btnClose.png";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from "react-intl";
import MenuBarHOC from "../../containers/menu-bar-hoc.jsx";
import {SCREENS}from "../gui/constant.js";
import ProjectDetail from "./project-detail.jsx";
import AlertLogin from '../gui/alert-login.jsx';
 class PopUpProjectManagement extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "closePopup","onShowLoginAlert","onCloseLoginAlert"
        ]);

        this.state = {isDetail: false, showAlertLogin:false};

     
    }
    onCloseLoginAlert()
    {

        this.setState({showAlertLogin:false});

    }

    onShowLoginAlert()
    {

        var check = !this.state.showAlertLogin;
        this.setState({showAlertLogin:check});
    }
    closePopup() {
        console.log("Close Popup");
        this.props.closePopup();
    }

   

    onGoforgotPassword()
    {

        setShow(SCREENS.screen_ForgotPassword)

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

    componentDidMount() {
       
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
                        overflow: "hidden",
                    }}
                >
                    <div
                        id="main"
                        style={{
                            width: '100%',
                            marginTop:'20px',
                            marginBottom:'20px',
                            padding:'20px',
                            height:'100%',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            display: flex,
                            alignContent:'center',
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                marginBottom:-40,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: "transparent",
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                height: 30,
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
                            >
                            </text>

                            <img
                                onClick={this.closePopup}
                                style={{
                                    zIndex:100,
                                    marginRight: 5,
                                    width: 25,
                                    height: 25,
                                    alignSelf: "center",
                                }}
                                src={iconExit}
                            />
                        </div>

                        
                        <div
                        style={{
                            width: "100%",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            display: "flex",
                            borderRadius:'20px',
                             
            
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
                                height: "80px",
                                borderTopLeftRadius:'10px',
                                borderTopRightRadius:'10px',
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
                                        borderRadius: "25px",
                                        borderWidth: 5,
                                        marginRight: "20px",
                                        backgroundColor: "#FFF",
                                    }}
                                >
                                    <input
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
                                    <div className={styles.ico_search_codekitten} />
                                </div>
                            </div>
                            <button onClick={this.onShowLoginAlert}
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
                                    <img style={{ alignSelf: "center" }} src={icon_add} />
                                </div>{" "}
                                <a  style={{ alignSelf: "center", marginLeft: "5px" }}>
                                    Đăng dự án{" "}
                                </a>{" "}
                            </button>
                        </div>
            
                        <div style={{ marginTop: "-95px" }}>
                            <ul className={styles.tabs}>
                            {
                                localStorage.getItem("login")==='true'?

                                <ButtonGroup
                                buttons={["Dự án cộng đồng", "Dự án của tôi"]}
                                doSomethingAfterClick={this.printButtonLabel}
                            /> :  <ButtonGroup
                            buttons={["Dự án cộng đồng"]}
                            doSomethingAfterClick={this.printButtonLabel}/>

                            }
                               
                            </ul>
                        </div>
            
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderBottomLeftRadius:'10px',
                                borderBottomRightRadius:'10px',
                                backgroundColor: "#FFF",
                            }}
                        >
                            <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                                <div style={{ fontWeight: "bold", fontSize: 16 }}>
                                    <span>Toàn bộ dự án </span>
                                </div>
            
                                <div
                                    style={{
                                        fontWeight: "normal",
                                        fontSize: 14,
                                        marginTop: "10px",
                                    }}
                                >
                                    <span>Tổng cộng có 32 dự án </span>
                                </div>
                            </div>

                            <div style={{width:'100%', height:'500px', overflowY:'scroll'}}>
                            <ProjectList  onShowDetail={this.onShowDetail} />

                            </div>
            
                            <div         
                                style={{ marginTop: "30px", zIndex:5, height:'100%', width: "100%"}}
                            >
                                {     
                                    this.state.isDetail?  <ProjectDetail  onClosePopup={this.onClose} />
                                    :<div></div>
                                }
                            </div>

                            <div         
                            style={{ marginTop: "30px", zIndex:5, height:'100%', width: "100%"}}
                        >
                            {     
                                this.state.showAlertLogin?  <AlertLogin onClosePopup={this.onCloseLoginAlert} />
                                :<div></div>
                            }
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
    setShow: PropTypes.func
    
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
