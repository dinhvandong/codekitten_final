import React from "react";

import logoTeky from '../menu-bar/logo-teky.png';

import iconFolder from '../menu-bar/folder.png'

import iconTool  from '../menu-bar/tools.png';

import iconTutorial from './ic_tuto.png';

export default function CommunityHeader() {
    return (
        <div style={{
                flexDirection:'row',
                display: "flex",
                width: "100%",
                height: "45px",
                backgroundColor: "#F9F154",
            }}>

            <div style={{flex:6, height:'100%', width:'100%', display:'flex', flexDirection:'row'}}>


            <img src={logoTeky} style={{width:'129px', height:'30px', marginLeft:'10px', alignSelf:'center'}}/>

            <div style={{marginLeft:'50px', alignSelf:'center'}}>
            <img src={iconFolder} style={{ opacity:0.8,}}/>
            </div>

            <div style={{marginLeft:'30px', alignSelf:'center'}}>
            <img src={iconTool} style={{ opacity:0.8,}}/>
            </div>

            <div style={{marginLeft:'50px', alignSelf:'center'}}>
            <img src={iconTutorial} style={{width:'20px', height:'20px', opacity:0.8}}/>
            </div>
            
            </div>
            <div style={{flex:1, display:'flex', flexDirection:'row', alignContent:'flex-end', alignItems:'center'}}>

                <button style={{ borderColor:'transparent', backgroundColor:'transparent', marginRight:'0px', fontSize:14, width:'100px', fontWeight:'50%'}}><b>Đăng ký</b></button>
                <button style={{borderColor:'transparent',backgroundColor:'transparent', marginLeft:'20px', fontSize:14, width:'100px', fontWeight:'50%'}}><b>Đăng nhập</b></button>


            </div>

           
        </div>
    );
}
