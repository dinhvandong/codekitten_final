import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconFlag from "./upload/vietnam.png";
import iconCodeKittenRight from "./images/teky/codekitten-orange-right.png";
//"images/teky/codekitten.png"
import styles from "./login.css";
import APICodeKitten from "../../api.js";
import { func } from "prop-types";
import { SCREENS } from "../gui/constant";
export default class RegisterCodeKitten extends React.Component 
{
    constructor(props) {
        super(props);
        this.state ={isSuccess: false, phoneNumber:""};
        this.handleClick = this.handleClick.bind(this);
        this.handleTexChange = this.handleTexChange.bind(this);
        this.requestAPI = this.requestAPI.bind(this);
        this.moveToAuthenOTP = this.moveToAuthenOTP.bind(this);
    }
    moveToAuthenOTP()
    {
       this.props.setShow(SCREENS.screen_OTP)
    }
    requestAPI() 
    {
        const phoneNumber = this.state.phoneNumber;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobile_number: "+84" + phoneNumber }),
        };
        var url = APICodeKitten.mobile_otp_registration;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                const value = data.message;
                if(value.status_code==200)
                {
                    localStorage.setItem("phonenumber", "+84" + phoneNumber);
                    this.moveToAuthenOTP();
                }
            });
    }
    handleTexChange(event) 
    {
        this.setState({ phoneNumber: event.target.value });
    }
    handleClick(e) 
    {
        e.preventDefault();
        this.requestAPI();
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
                                                    justifyContent:"center",
                                                    alignItems:'center',
                                                    marginLeft: "10px",
                                                    fontWeight: 10,
                                                    color: "#9ea9c9",
                                                }}
                                            >
                                                <span
                                                    style={{ color:'#000000', fontWeight:'bold', fontSize:14, marginBottom:'2px',
                                                        alignSelf: "center",
                                                    }}
                                                >
                                                    +84
                                                </span>{" "}
                                                <input onChange={this.handleTexChange}
                                                    className={
                                                        styles.input_phone
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        id="button"
                                        className={styles.btn_primary}
                                        onClick={this.handleClick}
                                    >
                                        <div
                                            style={{
                                                fontSize: 18,
                                                fontWeight: "lighter",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                flex: 3,
                                            }}
                                        >
                                            <span>
                                                <b>Đăng ký</b> miễn phí{" "}
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
