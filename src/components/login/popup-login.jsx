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
import bindAll from "lodash.bindall";
import myproject from "../myproject/myproject.css";
//myproject.css";

import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "../gui/ic_cat.svg";
import iconExit from "./btnClose.png";
import { setMyProject, setShowLogin } from "../../reducers/mode";
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
import { Paper, TablePagination } from "@material-ui/core";
import { autoUpdateProject } from "../../reducers/project-state";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import ConfigServer from "../../config_server.js";
import LoginCodeKitten from "./login.jsx";
import {SCREENS}from "../gui/constant.js";
 class PopUpLogin extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "closePopup"
           
        ]);
       
    }

    
    closePopup() {
        console.log("Close Popup");
        this.props.closePopup();
        //closeLogin(false);
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
        // const apiUrl = ConfigServer.host + "/api/project/getAll";
        // fetch(apiUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         this.setState({ user: data });
        //     });
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
        // const { user } = this.state;
        // const { page } = this.state;

        // const { rowsPerPage } = this.state;
        // const emptyRows =
        //     rowsPerPage -
        //     Math.min(rowsPerPage, user.length - page * rowsPerPage);

        // this.setState= {page : newPage};

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
                        display:'flex',
                        justifyContent:'center'
                    }}
                >
                    <div
                        id="main"
                        style={{
                            width: 800,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                marginBottom:-30,
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
                                    width: 30,
                                    height: 30,
                                    alignSelf: "center",
                                }}
                                src={iconExit}
                            />
                        </div>

                        <LoginCodeKitten  closePopup = {this.props.closePopup} setShow={this.props.setShow}/>
                    </div>
                </view>
            </Modal>
        );
    }
}

PopUpLogin.propTypes = {
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
)(PopUpLogin);
