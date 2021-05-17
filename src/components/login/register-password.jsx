import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
///import iconCodeKittenRight from "./images/teky/codekitten-primary-right.png";
import iconCodeKittenRight from "./images/teky/codekitten-orange-right.png";

//"images/teky/codekitten.png"
import styles from "./login.css";
import "./login.css";

//"./css/style.min.css";
//"./login.css";

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
 export default function RegisterPassword() {
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

                            <div style={{fontSize:18, fontWeight:'bold'}}>

                            Tạo mật khẩu 
                            </div>

                            <div className={styles.icon_key_login}>
                            
                            </div>

                            <div style={{marginTop:'10px', fontSize:14}}>

                            <span>Tạo <u> <b>mật khẩu</b> </u>để thuận tiện cho bạn<br/>khi đăng nhập</span>
                            </div>




                            <div className={styles.c_login__form}>
                                <div
                                    className={
                                        styles.c_login__form__form_group__form_control_name
                                    }
                                >
                                    <input
                                        id="inputID"
                                        className={styles.input_name}
                                        placeholder="Số tài khoản"
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
                                        id="inputID"
                                        className={styles.input_name}
                                        placeholder="Mật khẩu"
                                        type="text"
                                        required
                                    />
                                    <button
                                        className={
                                            styles.c_login__form__form_group_is_password_button
                                        }
                                    >
                                        {" "}
                                        <i
                                            className={styles.icon_invisible}
                                        ></i>
                                    </button>
                                </div>

                                <div className={styles.btn_primary}>
                                    <div
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "lighter",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flex:3
                                        }}
                                    >
                                        <span>Hoàn thành đăng ký </span>
                                    </div>

                                    <div
                                        style={{
                                            flex:1,
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
                                        marginTop: "20px",
                                    }}
                                >
                                    <span> Bạn đã có tài khoản? </span>{" "}
                                    <a style={{ color: "#0062da" }}>
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


//  export default (RegisterPassword) => {
//      ReactDOM.render(<App />, RegisterPassword);
//  };

