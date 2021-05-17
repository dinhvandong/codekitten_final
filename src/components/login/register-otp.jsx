import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconCodeKittenRight from "./images/teky/codekitten-orange-right.png";
//"images/teky/codekitten.png"
import styles from "./login.css";
//"./css/style.min.css";
//"./login.css";
export default function RegisterOTP() {
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

                            <div style={{ fontSize: 18, fontWeight: "bold" }}>
                                Xác thực tài khoản
                            </div>

                            <div style={{ marginTop: "50px", fontSize: 14 }}>
                                <span>
                                    OTP đã được gửi đến số điện thoại
                                    <br />
                                    <b>+84965741051</b>
                                </span>
                            </div>

                            <div style={{ marginTop: "20px", fontSize: 12 }}>
                                <span>
                                <a style={{ color: "#0062da", fontWeight:'bold' }}>                                    Đổi số điện thoại khác
                                </a>
                                </span>
                            </div>



                            <div style={{ marginTop: "19px", 
                                 textAlign: "left"}} >

                            <input className={styles.c_login__otp__input_input} type="tel" maxlength="1" />
                            <input className={styles.c_login__otp__input_input} type="tel" maxlength="1" />
                            <input className={styles.c_login__otp__input_input} type="tel" maxlength="1" />
                            <input className={styles.c_login__otp__input_input} type="tel" maxlength="1" />
                            <input className={styles.c_login__otp__input_input} type="tel" maxlength="1" />
                            <input className={styles.c_login__otp__input_input} type="tel" maxlength="1" />


                            
                            </div>

                            <div className={styles.btn_primary}>
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
                                    <i className={styles.icon_right_arrow}></i>
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
                           
                        </div>
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
                                <a style={{ color: "#0062da" }}>
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

// export default (otp) => {
//     ReactDOM.render(<App />, otp);
// };
