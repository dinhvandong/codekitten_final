import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconFlag from "./upload/vietnam.png";
import iconCodeKittenRight from "./images/teky/codekitten-orange-right.png";
//"images/teky/codekitten.png"
import styles from "./login.css";
//"./css/style.min.css";
//"./login.css";
export default function RegisterCodeKitten() {
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
                                    }>
                                    <div
                                        className={
                                            styles.c_login__form__form_group__c_icon_country
                                        }>
                                        <img src={iconFlag} />
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <div style={{ marginLeft: "10px", fontWeight:8, color:'#9ea9c9' }}>
                                            <span>Số điện thoại</span>
                                        </div>

                                        <div style={{display:'flex', flexDirection:'row', marginLeft: "10px", fontWeight:10, color:'#9ea9c9' }}>
                                           <span style={{   alignSelf: 'center'
                                           }}>+84</span> <input className={styles.input_phone}/>
                                        </div>
                                    </div>
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
                                        <span><b>Đăng ký</b> miễn phí </span>
                                    </div>

                                    <div
                                        style={{
                                            width: "50px",
                                            marginLeft: "30px",
                                            display: "flex",
                                            flex: 1,
                                            marginRight:20,
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            flexDirection: "row",
                                        }}>
                                        <i
                                            className={styles.icon_right_arrow}
                                        ></i>
                                    </div>
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

// export default (Register) => {
//     ReactDOM.render(<App />, Register);
// };
