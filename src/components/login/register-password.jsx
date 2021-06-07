import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconCodeKittenRight from "./images/teky/codekitten-orange-right.png";
import styles from "./login.css";
import "./login.css";
import APICodeKitten from "../../api";
import { SCREENS } from "../gui/constant";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ConfigServer from "../../config_server";
const eye = <FontAwesomeIcon icon={faEye} />;

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
export default class RegisterPassword extends React.Component {
    constructor(props) {
        super(props);
        this.requestAPI = this.requestAPI.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.moveLogin = this.moveLogin.bind(this);
        this.state = {passwordShown: false, password:""};
        this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);
    }

    moveLogin()
    {

        this.props.setShow(SCREENS.screen_Login);

    }
    requestAPI() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                registration_code: localStorage.getItem("signup_token"),
                password: this.state.password,
                client_id: ConfigServer.client_id ,
                client_secret:
                   ConfigServer.client_secret
            }),
        };
        
        var url = APICodeKitten.registration_password;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("response:", data);
                const value = data.message;

                const dataToken = data.data;


                if(value.status_code==200)
                {
                   console.log("Success:ABC");
                   const pass =  this.state.password;
                   localStorage.setItem("password", pass);
                   localStorage.setItem("login", true);
                   const token = dataToken.access_token   ;                             localStorage.setItem("token", returnData.access_token);

                   localStorage.setItem("token", token);

                   this.props.onClosePopup();
                }
            });
    }

     togglePasswordVisiblity(){
        console.log("togglePasswordVisiblity")
        if(this.state.passwordShown){
            this.setState({passwordShown:false});
        }else
        {
            this.setState({passwordShown:true});
        }
      }

      onPasswordChange(event)
      {
        this.setState({password: event.target.value});
      }
    handleClick(e) {
        e.preventDefault();
        console.log("The link was clicked.");

        //localStorage.setItem("login", true);

        //this.props.closePopup();
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

                                <div
                                    style={{ fontSize: 18, fontWeight: "bold" }}
                                >
                                    Tạo mật khẩu
                                </div>

                                <div className={styles.icon_key_login}></div>

                                <div
                                    style={{ marginTop: "10px", fontSize: 14 }}
                                >
                                    <span>
                                        Tạo{" "}
                                        <u>
                                            {" "}
                                            <b>mật khẩu</b>{" "}
                                        </u>
                                        để thuận tiện cho bạn
                                        <br />
                                        khi đăng nhập
                                    </span>
                                </div>

                                <div className={styles.c_login__form}>
                                    <div
                                        className={
                                            styles.c_login__form__form_group__form_control_name
                                        }
                                    >
                                        <input
                                            disabled = "disable"
                                            id="inputID"
                                            className={styles.input_name}
                                            placeholder="Số tài khoản"
                                            value={localStorage.getItem("phonenumber")}
                                            type="text"
                                            required
                                        />
                                    </div>

                                    <div
                                        className={
                                            styles.c_login__form__form_group__form_control_password
                                        }
                                    >
                                        <input

                                            onChange={this.onPasswordChange}
                                            id="inputID"
                                            className={styles.input_name}
                                            placeholder="Mật khẩu"
                                            type= {this.state.passwordShown ? "text" : "password"}

                                            required
                                        />
                                        <button
                                            className={ 
                                                styles.c_login__form__form_group_is_password_button
                                            }
                                        >
                                            {" "}
                                            <i onClick={this.togglePasswordVisiblity}
                                                className={ this.state.passwordShown?
                                                    styles.icon_visible: styles.icon_invisible
                                                }
                                            ></i>
                                        </button>
                                    </div>

                                    <button
                                        onClick={this.handleClick}
                                        className={styles.btn_primary}
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
                                            <span>Hoàn thành đăng ký </span>
                                        </div>

                                        <div
                                            style={{
                                                flex: 1,
                                                width: "50px",
                                                marginLeft: "30px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <i
                                                className={
                                                    styles.icon_right_arrow
                                                }
                                            ></i>
                                        </div>
                                    </button>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            width: "100%",
                                            textAlign: "right",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "95px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            width: "100%",
                                            textAlign: "right",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <span> Bạn đã có tài khoản? </span>{" "}
                                        <a onClick={this.moveLogin} style={{ color: "#0062da" }}>
                                            <b>&nbsp;Đăng nhập&nbsp;</b>ngay
                                        </a>
                                    </div>
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