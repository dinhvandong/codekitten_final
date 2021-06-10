
import { flex } from "to-style/src/prefixProperties";
import bindAll from "lodash.bindall";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "../gui/ic_cat.svg";
import iconExit from "./btnClose.png";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import {
    injectIntl,
} from "react-intl";
import MenuBarHOC from "../../containers/menu-bar-hoc.jsx";
import RegisterOTP from "./register-otp.jsx";
 class PopUpForgotOTP extends React.Component {
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
    componentDidMount() {
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
                        display:'flex',
                        justifyContent:'center',
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

                        <RegisterOTP  setShow ={this.props.setShow} onClosePopup={this.props.closePopup} />
                    </div>
                </view>
            </Modal>
        );
    }
}

PopUpForgotOTP.propTypes = {
    closePopup: PropTypes.func,
    setShow: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
});
const mapStateToProps = (state, ownProps) => {
    return null;
};

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(null, mapDispatchToProps)
)(PopUpForgotOTP);
