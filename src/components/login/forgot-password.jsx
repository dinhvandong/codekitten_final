import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconCodeKittenRight from "./images/teky/codekitten-primary-right.png";
import styles from "./login.css";
import iconFlag from "./upload/vietnam.png";
import { SCREENS } from "../gui/constant";
import APICodeKitten from "../../api.js";
import ConfigServer from "../../config_server.js";

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {phonenumber:""};
        this.onMoveAuthenOTP = this.onMoveAuthenOTP.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    }

    onChangePhoneNumber(e){
        this.setState({phonenumber: e.target.value});
    }

    onMoveAuthenOTP()
    {
        this.props.setShow(SCREENS.screen_ForgotOTP);
    }
    handleClick(e) {
        e.preventDefault();
        const data = {
            mobile_number: "+84" + this.state.phonenumber,
            client_id: ConfigServer.client_id,
            client_secret: ConfigServer.client_secret

        };

         const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

       var url = APICodeKitten.forgot_password_by_phone;

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            const returnData = result.data;
            const value = result.message;
                        if(value.status_code==200)
                        {

                            this.onMoveAuthenOTP();

                            // localStorage.setItem("phonenumber", this.state.username);
                            // localStorage.setItem("username", this.state.username);
                            // localStorage.setItem("login", true);
                            // localStorage.setItem("token", returnData.access_token);
                            // this.onClose();

                        }

        });

    }
    render() {
        return (
            <div
                style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    height: "100%",
                    backgroundColor: "#454545",
                }}
            >
                <div
                    style={{
                        minHeight: "auto",
                        maxWidth: "678px",
                        borderRadius: 20,
                        borderRadius: 20,
                        border: "5px solid #000",
                        width: "100%",
                        alignContent: "center",
                        alignSelf: "center",
                        background: "#fff",
                        width: "810px",
                        height: "678px",
                        maxWidth: "835px",
                        position: "relative",
                        zIndex: "1",
                        display: "block",
                    }}
                >
                    <div className={styles.c_bblack_center__is_register}>
                        <div className={styles.c_bblack_center__left}>
                            <div className={styles.c_login}>
                                <div className={styles.c_login_top}>
                                    <img src={iconCodeKitten} />
                                </div>
                                <div className={styles.c_login__form}>
                                    <div
                                        className={
                                            styles.c_login__form__form_group__form_control_phone
                                        }
                                    >
                                        <div
                                            className={
                                                styles.c_login__form__form_group__c_icon_country
                                            }
                                        >
                                            <img src={iconFlag} />
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    marginLeft: "10px",
                                                    fontWeight: 8,
                                                    color: "#9ea9c9",
                                                }}
                                            >
                                                <span>Số điện thoại</span>
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    marginLeft: "10px",
                                                    fontWeight: 10,
                                                    color: "#9ea9c9",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        alignSelf: "center",
                                                    }}
                                                >
                                                    +84
                                                </span>{" "}
                                                <input onChange={this.onChangePhoneNumber}
                                                    className={
                                                        styles.input_phone
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={styles.btn_primary}
                                        onClick={this.handleClick}
                                    >
                                        <div
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "lighter",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                flex: 5,
                                            }}
                                        >
                                            <span>
                                                Gửi yêu cầu qua điện thoại
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                width: "50px",
                                                marginLeft: "30px",
                                                display: "flex",
                                                flex: 1,
                                                marginRight: 20,
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <i
                                                className={
                                                    styles.icon_right_arrow
                                                }
                                            ></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.c_bottom_loginall}>
                                <div className={styles.c_login__bottom}>
                                    <span>Made with</span>
                                    <i className={styles.icon_tim_login}></i>
                                    <span>by TEKY</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.c_bblack_center__right}>
                            <img
                                style={{
                                    width: "415px",
                                    height: "100%",
                                    margin: "0px",
                                }}
                                src={iconCodeKittenRight}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
