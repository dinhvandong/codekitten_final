
import { flex } from "to-style/src/prefixProperties";
import { ButtonToolbar } from "react-bootstrap";
import bindAll from "lodash.bindall";
import myproject from "../myproject/myproject.css";
//myproject.css";

import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "../gui/ic_cat.svg";
import iconExit from "./btnClose.png";
import { setMyProject, setShowLogin, setShowRegister } from "../../reducers/mode";
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

import RegisterPassword from "./register-password.jsx";

 class PopUpRegisterPassword extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "closePopup",
            "callChildFunction"
        ]);

        this.callChildFunction = this.callChildFunction.bind(this);
    }


    callChildFunction () {
        this.child.handleActionParent();  ///calling a child function here
   } 

    closePopup() {
        console.log("Close Popup");
        this.props.closePopup(false);
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
                            display: flex,
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

                        <RegisterPassword  onClosePopup={this.closePopup} setShow ={this.props.setShow} />
                    </div>
                </view>
            </Modal>
        );
    }
}

PopUpRegisterPassword.propTypes = {
    closePopup: PropTypes.func,
    setShow: PropTypes.func,

};

const mapDispatchToProps = (dispatch) => ({
    //closeLogin: () => dispatch(setShowRegister(false)),
});
const mapStateToProps = (state, ownProps) => {
    return null;
};

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(null, mapDispatchToProps)
)(PopUpRegisterPassword);
