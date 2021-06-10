import React from "react";
import styles from "./project-detail.css";
import iconClose from "./icon/ico-close.png";
import avatar from "./avatar.png";
import refresh from "./refresh.png";
//import project_info from "./img-info-subject.png";

import iconEdit from "./edit.png";
import style from "react-awesome-modal/lib/style";
export default class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.onRemix = this.onRemix.bind(this);
        this.state= {name: localStorage.getItem("name"),

         description: localStorage.getItem("description"), 

         created_by:localStorage.getItem("created_by"), 

         link_download:localStorage.getItem("link_download"),

         thumbnail:localStorage.getItem("thumbnail"),
         
         thumb_base64: ("url(data:image/jpg;base64," + localStorage.getItem("thumbnail_base64"))
    }

        /**  localStorage.setItem("link_download", 
         * ConfigServer.host + '/code_kittens_api/projects/'+ id );
          localStorage.setItem("thumbnail_base64", thumbnail_base64);
         */

        // const name              = this.props.name;
        // const description       = this.props.description;
        // const thumbnail_base64  = localStorage.getItem("thumbnail_base64");
        // const link_download     = localStorage.getItem("linkdownload");
    }

    componentDidMount()
    {
        this.setState({name: localStorage.getItem("name")});

        this.setState({description:localStorage.getItem("description")});

        this.setState({created_by: localStorage.getItem("created_by")});

        this.setState({thumb_base64: "url(data:image/jpg;base64," + localStorage.getItem("thumbnail_base64") +")"});

        this.setState({thumbnail: localStorage.getItem("thumbnail")});

        this.setState({link_download: localStorage.getItem("link_download")});

        console.log("Thumb_Base64", this.state.thumb_base64)
    }

    onRemix() {
        console.log("Onremix_AAAA");
       // this.props.onClosePopup();
        this.props.onRemix();
    }

    onClose() {
        console.log("DONG DU AN");

        this.props.onClosePopup();
    }

    render() {

        

        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    display: "flex",
                    justifyContent: "center",
                    top: 0,
                    zIndex: 10,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                    margin: "auto",
                    backgroundColor: "rgba(0,0,0, 0.5)",
                }}
            >
                <div
                    style={{
                        alignSelf: "center",
                        flexDirection: "column",
                        width: "600px",
                        height: "620px",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            height: "40px",
                            borderTopRightRadius: "10px",
                            borderTopLeftRadius: "10px",
                            flexDirection: "row",
                            backgroundColor: "#1CC3A5",
                        }}
                    >
                        <div
                            style={{
                                marginLeft: "10px",
                                width: "100%",
                                alignSelf: "center",
                                fontWeight: "bold",
                                color: "#FFF",
                            }}
                        >
                            Chi tiết dự án
                        </div>

                        <div
                            style={{ alignSelf: "center", marginRight: "10px" }}
                            onClick={this.onClose}
                        >
                            <img
                                style={{ width: "20px", height: "20px" }}
                                src={iconClose}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            zIndex: 10000,
                            borderBottomRightRadius: "10px",
                            borderBottomLeftRadius: "10px",
                            height: "100%",
                            backgroundColor: "#FFF",
                        }}
                    >
                        <div
                            style={{
                                alignItems: "center",
                                width: "100%",
                                height: "60px",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <div
                                style={{
                                    width: "60px",
                                    alignItems: "center",
                                    height: "60px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    src={avatar}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        alignSelf: "center",
                                        marginLeft: "20px",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    width: "100%",
                                    alignSelf: "center",
                                    marginLeft: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "12px",
                                    }}
                                >
                                    <span>Dự án của</span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        height: "50%",
                                        alignItems: "center",
                                        color: "#007bff",
                                        fontSize: "12px",
                                    }}
                                >
                                    <span>{this.state.created_by}</span>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignSelf: "center",
                                alignContent: "center",
                                width: "100%",
                                height: "450px",
                                backgroundColor: "#FFF",
                            }}
                        >
                            <div style={{backgroundImage:"url(" + this.state.thumbnail + ")"}} className={styles.border_project_detail}>
                                <img
                                    onClick={this.onRemix}
                                    style={{
                                        width: "80px",
                                        zIndex: 10,
                                        height: "80px",
                                        alignItems: "center",
                                        alignSelf: "center",
                                    }}
                                    src={refresh}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                height: "60px",
                                justifyContent: "center",
                                display: "flex",
                                marginTop: "0px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    marginLeft: "10px",
                                    flexDirection: "row",
                                    backgroundColor: "#E8EDFC",
                                    borderBottomLeftRadius: "10px",
                                    borderBottomRightRadius: "10px",
                                    marginRight: "10px",
                                    width: "100%",
                                    height: "100%",
                                    alignSelf: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "12px",
                                        marginTop: "10px",
                                        marginLeft: "20px",
                                        width: "90%",
                                        display: "flex",

                                        flexDirection: "column",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                            }}
                                        >
                                            <span>{this.state.name}</span>
                                        </div>

                                        <div
                                            style={{
                                                color: "#007bff",
                                                marginTop: "5px",
                                            }}
                                        >
                                            <span>{this.state.description}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.buttonRemix}
                                    
                                    onClick={this.onRemix}
                                >
                                    <img
                                        src={iconEdit}
                                        style={{
                                            alignSelf: "center",
                                            width: "12px",
                                            height: "12px",
                                        }}
                                    />

                                    <div
                                        style={{
                                            alignSelf: "center",
                                            marginLeft: "5px",
                                            color: "#FFF",
                                            fontWeight: "normal",
                                            fontSize: 12
                                        }}
                                        onClick={this.onRemix}
                                    >
                                        <span>Sửa dự án</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
