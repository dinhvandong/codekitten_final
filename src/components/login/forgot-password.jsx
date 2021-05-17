import React from "react";
import ReactDOM from "react-dom";
import iconCodeKitten from "./images/teky/codekitten.png";
import iconCodeKittenRight from "./images/teky/codekitten-primary-right.png";
import styles from "./login.css";
export default function ForgotPassword() {
    return (
        <div
            style={{
                width: "100%",
                justifyContent:'center',
                display:'flex',
                alignContent:'center',
                alignItems:'center',
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
                    alignContent:'center',
                    alignSelf:'center',
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
                        
                    </div>
                    <div className={styles.c_bblack_center__right}>
                    <img style={{width:'415px', height:'100%', margin:'0px'}} src={iconCodeKittenRight}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default (ForgotPassword) => {
//     ReactDOM.render(<App />, ForgotPassword);
// };
