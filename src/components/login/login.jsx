import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconCodeKittenRight from "./images/teky/codekitten-primary-right.png";
//"images/teky/codekitten.png"
import styles from "./login.css";
import "./login.css";
import { SCREENS } from "../gui/constant";
import APICodeKitten from "../../api";

//"./css/style.min.css";
//"./login.css";

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
export default class LoginCodeKitten extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {username:'', password:'', passwordShown:false};
        this.onClose = this.onClose.bind(this);
        this.onForgotPass = this.onForgotPass.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.togglePasswordVisiblity = this.togglePasswordVisiblity.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.requestAPI = this.requestAPI.bind(this);

    }

    togglePasswordVisiblity(){
        console.log("togglePasswordVisiblity")
        if(this.state.passwordShown){
            this.setState({passwordShown:false});
        } else
        {
            this.setState({passwordShown:true});
        }
      }

      onPasswordChange(event)
      {
        this.setState({password: event.target.value});
      }
      onUserChange(event)
      {
          this.setState({username: event.target.value});
      }

      onClose()
      {
        this.props.setShow(SCREENS.screen_ALL);
        this.props.closePopup();
      }

      onRegister()
      {

        this.props.setShow(SCREENS.screen_Register);

      }

      onForgotPass()
      {

        this.props.setShow(SCREENS.screen_ForgotPassword);

      }



     requestAPI()
     {
        const origin = this.state.username.substring(1, this.state.username.length);
        const data = {
            client_id: "fcJoXwOWAaNPd8TiYckAR6Vi5RwtOysSGEiqIc6f",
            client_secret:
                "DBd4m5Il5jRLc5c07ktA3IBSjcpjbThfqPqIJQZDyI7Iy2NXJYoQOoPq9eyi8Wd8Xk8VWYzbksyOIQp9oU5DWfyGCkWJ8XuRNFOfZkegKTE5UjNNQckLnVbqCfxqeEqY",
            username: "+84" + origin,
            password: this.state.password,
            grant_type:"password"
        };

        var url = 'https://dev.teky.asia/v1/auth/login';


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {


                console.log("JSON_LOGIN:", result);

                const value = result.message;
                            if(value.status_code==200)
                            {
                                localStorage.setItem("phonenumber", this.state.username);
                                localStorage.setItem("username", this.state.username);
                                localStorage.setItem("login", true);

                                this.onClose();

                            }

            });




     } 
    
    handleClick(e) {
        e.preventDefault();
        console.log("The link was clicked.");

        this.requestAPI()
        // const origin = this.state.username.substring(1, this.state.username.length);
        // const data = {
        //     client_id: "fcJoXwOWAaNPd8TiYckAR6Vi5RwtOysSGEiqIc6f",
        //     client_secret:
        //         "DBd4m5Il5jRLc5c07ktA3IBSjcpjbThfqPqIJQZDyI7Iy2NXJYoQOoPq9eyi8Wd8Xk8VWYzbksyOIQp9oU5DWfyGCkWJ8XuRNFOfZkegKTE5UjNNQckLnVbqCfxqeEqY",
        //     username: "+84" + origin,
        //     password: this.state.password,
        //     grant_type:"password"
        // };
        // var url = 'https://dev.teky.asia/v1/auth/login';

        // const jsonString = JSON.stringify(data);

        // console.log("jsonString",jsonString);
        // fetch(url, {
        //     method: "POST",
        //     body: jsonString,
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //     },
        // })
        //     .then((res) => res.json)
        //     .then(
        //         (result) => {
        //             console.log("Result", JSON.stringify(result));
        //             const value = result.message;
        //             if(value.status_code==200)
        //             {
        //                 localStorage.setItem("phonenumber", this.state.username);
        //                 localStorage.setItem("username", this.state.username);
        //                 this.onClose();
        //                 localStorage.setItem("login", true);
        //             }
        //         },
        //         (error) => {}
        //     );
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
                                            styles.c_login__form__form_group__form_control_name
                                        }
                                    >
                                        <input
                                          onChange={this.onUserChange}
                                            id="inputID"
                                            className={styles.login_form_input_name}
                                            placeholder="Số điện thoại hoặc tên đăng nhập"
                                            type="text"
                                            required
                                        />
                                    </div>

                                    <div
                                        className={
                                            styles.c_login__form__form_group__form_control_password
                                        }
                                    >
                                        <input onChange={this.onPasswordChange}
                                            id="inputID"
                                            className={styles.login_form_input_name}
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
                                                className={ this.state.passwordShown ?
                                                    styles.icon_visible : styles.icon_invisible
                                                }
                                            ></i>
                                        </button>
                                    </div>

                                    <div onClick={this.handleClick} className={styles.btn_primary}>
                                        <div
                                            style={{
                                                fontSize: 18,
                                                fontWeight: "lighter",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span>
                                                Đăng nhập bằng mật khẩu{" "}
                                            </span>
                                        </div>

                                        <div
                                            style={{
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
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            width: "100%",
                                            textAlign: "right",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "95px",
                                        }}
                                    >
                                        <span style={{ float: "right" }}>
                                            {" "}
                                            Bạn không nhớ{" "}
                                        </span>{" "}
                                        <a onClick={this.onForgotPass} style={{ color: "#0062da" }}>
                                            {" "}
                                            <b> &nbsp; mật khẩu?</b>
                                        </a>
                                    </div>
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
                                        <span> Bạn chưa có tài khoản? </span>{" "}
                                        <a style={{ color: "#0062da" }} onClick={()=>{this.props.setShow(SCREENS.screen_Register)}}>
                                            <b>&nbsp;Đăng ký ngay</b>
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


