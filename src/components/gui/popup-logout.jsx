import { flex } from "to-style/src/prefixProperties";
import bindAll from "lodash.bindall";
//myproject.css";

import "reactjs-popup/dist/index.css";
import React from "react";
import Modal from "react-awesome-modal";
import iconExit from "./ic_exit.png";
import iconCat from "./ic_cat.svg";
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
import { SCREENS } from "../gui/constant.js";
class PopUpLogout extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, ["logout_confirm_no","logout_confirm_yes"]);
    }

    logout_confirm_yes() {
        console.log("Close Popup");
        this.props.closePopup();
        localStorage.setItem("login", false);
    }

    logout_confirm_no()
    {
        console.log("Close Popup");
        this.props.closePopup();
        localStorage.setItem("login", true);

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

    componentDidMount() {}

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
                            width: 200,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            display: flex,
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
                            ></text>
                        </div>

                        <div
                            style={{
                                backgroundColor: "#FFF",
                                width: "300px",
                                height: "100px",
                                borderRadius: "5px",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "30px",
                                    flexDirection: "row",
                                    alignContent: "center",
                                    display: "flex",
                                    borderTopLeftRadius: "5px",
                                    borderTopRightRadius: "5px",
                                    alignSelf: "center",
                                    fontSize: "13px",
                                    backgroundColor: "#0FBD8C",
                                }}
                            >
                                <img
                                    style={{
                                        width: "25px",
                                        height: "25px",
                                        alignSelf: "center",
                                    }}
                                    src={iconCat}
                                />
                                <span
                                    style={{
                                        alignSelf: "center",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Bạn có muốn đăng xuất ra khỏi hệ thống?
                                </span>
                            </div>

                            <div style={{width:'100%', justifyContent:'center', justifyItems:'center', marginTop:'20px' , display:'flex', flexDirection:'row', height:'100%'}}>


                            <button onClick={this.logout_confirm_yes} style={{width:'50px', marginRight:'20px', height:'20px'}}>Yes</button>

                            <button onClick={this.logout_confirm_no} style={{width:'50px', height:'20px'}}>No</button>
                            
                            </div>
                        </div>
                    </div>
                </view>
            </Modal>
        );
    }
}

PopUpLogout.propTypes = {
    //closeLogin: PropTypes.func,
    closePopup: PropTypes.func,
    setShow: PropTypes.func,
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
)(PopUpLogout);
