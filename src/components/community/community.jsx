import CommunityHeader from "./community-header.jsx";
import React from "react";
import styles from "./community.css";
import icon_add from "./add-codekitten.svg";

import ButtonGroup from "./libs/ButtonGroup.js";
import ProjectItem from "./project-item.jsx";
import ProjectList from "./project-list.jsx";
import ProjectDetail from "./project-detail.jsx";

 export default class  Community extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {isDetail: false};
        this.onClose = this.onClose.bind(this);
        this.printButtonLabel = this.printButtonLabel.bind(this);
        this.onShowDetail = this.onShowDetail.bind(this);
    }
    printButtonLabel(event){
        console.log(event.target.name);
    };

    onShowDetail()
    {

        console.log("onShowDetail",onShowDetail);
        this.setState({isDetail:true});
    }
    onClose()
    {
        console.log("onClose","onClose");
        this.setState({isDetail:false});
    }
    render()
    {

        return (
            <div
                style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    display: "flex",
                    borderRadius:'20px',
                     
    
                    alignContent: "flex-start",
                    alignItems: "flex-start",
                    height: "100%",
                    backgroundColor: "#454545",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignSelf: "center",
                        height: "80px",
                        background: "#1CC3A5",
                        backgroundImage:
                            "linear-gradient(to right,#1CC3A5, #F9F154)",
                    }}
                >
                    <div style={{ width: "100%", flex: 7 }}></div>
    
                    <div
                        style={{
                            flex: 3,
                            alignSelf: "center",
                            marginRight: "10px",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                height: "45px",
                                borderColor: "#000000",
                                borderRadius: "25px",
                                borderWidth: 5,
                                marginRight: "20px",
                                backgroundColor: "#FFF",
                            }}
                        >
                            <input
                                className={styles.input_search}
                                style={{
                                    flex: 10,
                                    width: "100%",
                                    marginLeft: "20px",
                                    marginRight: "10px",
                                    alignSelf: "center",
                                }}
                                placeholder="T??m ki???m d??? ??n"
                            />
                            <div className={styles.ico_search_codekitten} />
                        </div>
                    </div>
                    <button
                        style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            color: "#FFF",
                            fontWeight: "bold",
                            fontSize: 14,
                            flex: 1,
                            width: "150px",
                            height: "50px",
                            marginRight: "50px",
                            background: "#1CC3A5",
                            alignSelf: "center",
                            borderColor: "#1CC3A5",
                            alignContent: "flex-end",
                            borderRadius: "25px",
                        }}
                    >
                        <div style={{ alignSelf: "center" }}>
                            {" "}
                            <img style={{ alignSelf: "center" }} src={icon_add} />
                        </div>{" "}
                        <a style={{ alignSelf: "center", marginLeft: "5px" }}>
                            ????ng d??? ??n{" "}
                        </a>{" "}
                    </button>
                </div>
    
                <div style={{ marginTop: "-95px" }}>
                    <ul className={styles.tabs}>
                        <ButtonGroup
                            buttons={["D??? ??n c???ng ?????ng", "D??? ??n c???a t??i"]}
                            doSomethingAfterClick={this.printButtonLabel}
                        />
                    </ul>
                </div>
    
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#FFF",
                    }}
                >
                    <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                        <div style={{ fontWeight: "bold", fontSize: 16 }}>
                            <span>To??n b??? d??? ??n </span>
                        </div>
    
                        <div
                            style={{
                                fontWeight: "normal",
                                fontSize: 14,
                                marginTop: "10px",
                            }}
                        >
                            <span>T???ng c???ng c?? 32 d??? ??n </span>
                        </div>
                    </div>
                    <ProjectList  onShowDetail={this.onShowDetail} />
                    <div         
                        style={{ marginTop: "30px", zIndex:5, height:'100%', width: "100%"}}
                    >
                        {     
                            this.state.isDetail?  <ProjectDetail  onClosePopup={this.onClose} />
                            :<div></div>
                        }
                    </div>
                </div>
            </div>
            );
    }
}


 