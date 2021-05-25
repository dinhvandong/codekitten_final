import React from "react";
import { SCREENS } from "../gui/constant";
import profileIcon from "./mystuff.svg";
import logoutIcon from "./ic_logout.png";

export default class MenuLogin extends React.Component {
    constructor(props) {
        super(props);
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.showLogout = this.showLogout.bind(this);

    }

    showLogin()
    {

       this.props.onShowLogin();
    }

    showRegister()
    {

        this.props.onShowRegister();

    }

    showLogout()
    {

        this.props.onShowLogout();
    }

    render() {
        const login = localStorage.getItem("login");
        console.log("login",login);
        return (
            <div
                style={{
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {login === "true" ? (
                    <div   style={{display:'flex', flexDirection:'row'}}>
                        <img style={{ alignSelf:'center', width:'30px', height:'30px'}} src={profileIcon} />

                        <div
                            style={{ alignSelf:'center',marginRight:'10px', color: "#000000", fontWeight: "bold" }}
                        >
                            {localStorage.getItem("phonenumber")}
                        </div>

                        <img onClick={this.showLogout} style={{ alignSelf:'center', width:'20px', height:'20px', marginRight:'10px'}} src={logoutIcon} />


                    </div>
                ) : (
                    <div style={{display:'flex', marginRight:'10px', flexDirection:'row', alignContent:'center', justifyContent:'center', fontWeight:'bold'}}>
                        <button style={{alignSelf:'center', borderColor:'transparent', backgroundColor:'transparent'}} onClick={this.showRegister}>Bạn chưa có tài khoản?  <span style={{fontWeight:'bold'}}><u>Đăng ký</u></span></button>

                        <button style={{alignSelf:'center', marginLeft:'20px', borderColor:'transparent', backgroundColor:'transparent'}} onClick={this.showLogin}><span style={{fontWeight:'bold'}}><u>Đăng nhập</u></span></button>
                    </div>
                )}
            </div>
        );
    }
}
