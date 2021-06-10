import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconCodeKittenRight from "./images/teky/codekitten-orange-right.png";
//"images/teky/codekitten.png"
import styles from "./login.css";
import APICodeKitten from "../../api";
import { SCREENS } from "../gui/constant";
import InputFields from "./input-field.js";
//"./css/style.min.css";
//"./login.css";
export default class RegisterOTP extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number1Str: "",
            number2Str: "",
            number3Str: "",
            number4Str: "",
            number5Str: "",
            number6Str: "",
        };

        // this.number1 = React.createRef();
        // this.number2 = React.createRef();
        // this.number3 = React.createRef();
        // this.number4 = React.createRef();
        // this.number5 = React.createRef();
        // this.number6 = React.createRef();

        this.requestAPI = this.requestAPI.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.backtoRegister = this.backtoRegister.bind(this);
    }
    // }

    // onChangeNumber1 (event)
    // {

    //     //this.number1Str = event.target.value;
    //     //event.target.value
    //     const { value, maxLength } = event.target;

    //     if(maxLength>=1)
    //     {
    //         //this.number2.focus;
    //         this.number2.focus;

    //     }

    // }
    // onChangeNumber2 (event)
    // {
    //     const { value, maxLength } = event.target;

    // }
    // onChangeNumber3 (event)
    // {
    //     const { value, maxLength } = event.target;

    // }
    // onChangeNumber4 (event)
    // {
    //     const { value, maxLength } = event.target;

    // }
    // onChangeNumber5 (event)
    // {
    //     const { value, maxLength } = event.target;

    // }

    componentDidMount() {
        // this.number1.current.focus();
    }

    componentDidUpdate() {
       
    }
    requestAPI() {
        this.state.number1Str = localStorage.getItem("num1");
        this.state.number2Str = localStorage.getItem("num2");
        this.state.number3Str = localStorage.getItem("num3");
        this.state.number4Str = localStorage.getItem("num4");
        this.state.number5Str = localStorage.getItem("num5");
        this.state.number6Str = localStorage.getItem("num6");

        const otp =
            this.state.number1Str +
            this.state.number2Str +
            this.state.number3Str +
            this.state.number4Str +
            this.state.number5Str +
            this.state.number6Str ;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mobile_number: localStorage.getItem("phonenumber"),
                sms_code:
                   otp
            }),
        };
        var url = APICodeKitten.verify_mobile_otp_registration;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                const value = data.message;
                const token = data.data;
                if(value.status_code==200)
                {
                    const requestJson = JSON.stringify({
                        mobile_number: localStorage.getItem("phonenumber"),
                        sms_code:
                           otp
                    });

                    localStorage.setItem("otp", otp );
                    localStorage.setItem("token",token.signup_token)
                    this.props.setShow(SCREENS.screen_RegisterPassword);
                }
            });
    }

    backtoRegister() {
        this.props.setShow(SCREENS.screen_Register);
    }

    handleClick(e) {
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

                                <div
                                    style={{ fontSize: 18, fontWeight: "bold" }}
                                >
                                    Xác thực tài khoản
                                </div>

                                <div
                                    style={{ marginTop: "50px", fontSize: 14 }}
                                >
                                    <span>
                                        OTP đã được gửi đến số điện thoại
                                        <br />
                                        <b>
                                            {localStorage.getItem(
                                                "phonenumber"
                                            )}
                                        </b>
                                    </span>
                                </div>

                                <div
                                    style={{ marginTop: "20px", fontSize: 12 }}
                                >
                                    <span>
                                        <a
                                            onClick={this.backtoRegister}
                                            style={{
                                                color: "#0062da",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {" "}
                                            Đổi số điện thoại khác
                                        </a>
                                    </span>
                                </div>

                                <div
                                    style={{
                                        marginTop: "19px",
                                        textAlign: "left",
                                    }}
                                >
                                    <InputFields></InputFields>
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
                                        <span>Xác thực số điện thoại </span>
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
                                            className={styles.icon_right_arrow}
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
                                        marginTop: "50px",
                                    }}
                                >
                                    <span> Bạn đã có tài khoản? </span>{" "}
                                    <a
                                        onClick={this.backtoLogin}
                                        style={{ color: "#0062da" }}
                                    >
                                        <b>&nbsp;Đăng nhập&nbsp;</b>ngay
                                    </a>
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
