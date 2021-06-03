import bindAll from "lodash.bindall";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "../gui/ic_cat.svg";
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
//containers/menu-bar-hoc.jsx";
class ProjectDeleteQuestion extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, ["logout_confirm_no","logout_confirm_yes"]);

        this.logout_confirm_no = this.logout_confirm_no.bind(this);
        this.logout_confirm_yes = this.logout_confirm_yes.bind(this);

    }

    logout_confirm_yes() {
        console.log("Close Popup");
        this.props.onDeleteProject();
       // localStorage.setItem("login", false);
    }

    logout_confirm_no()
    {
        console.log("Close Popup");
        this.props.onCloseDelete();
        //closePopup();
       // localStorage.setItem("login", true);

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
                        display: 'flex',
                        justifyContent: "center",
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
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: -30,
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
                                    backgroundImage:
                                        "linear-gradient(to right,#1CC3A5, #F9F154)"
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
                                    Bạn chắc chắn xoá dự án?
                                </span>
                            </div>

                            <div style={{width:'100%', fontSize:'12px', justifyContent:'center', justifyItems:'center', marginTop:'20px' , display:'flex', flexDirection:'row', height:'100%'}}>
                            <button onClick={this.logout_confirm_yes} style={{width:'60px', borderColor:'transparent', marginRight:'20px', height:'25px'}}> <span>Yes</span></button>
                            <button onClick={this.logout_confirm_no}  style={{width:'60px', borderColor:'transparent', height:'25px'}}>                     <span style={{fontWeight:'bold'}}>NO</span></button>
                            
                            </div>
                        </div>
                    </div>
                </view>
            </Modal>
        );
    }
}

ProjectDeleteQuestion.propTypes = {
    //closeLogin: PropTypes.func,
    onCloseDelete: PropTypes.func,
    onDeleteProject: PropTypes.func,
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
)(ProjectDeleteQuestion);
