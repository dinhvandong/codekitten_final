import React from "react";
import styles from "./tutorial-detail.css";
import iconClose from "../community/icon/ico-close.png";
import avatar from "../community/avatar.png";
import refresh from "../community/refresh.png";
import iconEdit from "../community/edit.png";
export default class TutorialDetail extends React.Component {
    constructor(props) {
        super(props);
         this.onClose = this.onClose.bind(this);
       
    }

    componentDidMount() 
    {

        const value = localStorage.getItem("description");

        var desElement = document.getElementById("description");
        desElement.innerHTML += value;

    }

    onClose() 
    {
        this.props.onCloseDetail();
    }

    render() 
    {
        //const link_youtube = this.props.link_youtube;

        const link_youtube = localStorage.getItem("link_youtube",);
        const title = localStorage.getItem("title");
        const description = localStorage.getItem("description");



        // var tag_id = document.getElementById('description');
        // tag_id.innerHTML = description;

        // var desElement = document.getElementById("description");
        // desElement.innerHTML += description;



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
                        width: "680px",
                        height: "650px",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            height: "150px",
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
                                marginRight:'20px',
                                alignSelf: "center",
                                fontWeight: "bold",
                                color: "#FFF",
                                fontSize:'14px'
                            }}
                        >
                            {title}
                        </div>

                        <div onClick={this.onClose}
                            style={{
                                alignSelf: "center",
                                marginRight: "10px",
                                cursor: "pointer",
                            }}
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
                            height:'90%',
                            borderBottomRightRadius: "10px",
                            borderBottomLeftRadius: "10px",
                            backgroundColor: "#FFF",
                        }}
                    >
                        <div
                            style={{
                                alignItems: "center",
                                width: "100%",
                                height: "180px",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <form style={{
                                alignItems: "center",
                                width: "100%",
                                height: "180px",
                                display: "flex",
                                flexDirection: "row",
                            }} >
                            
                            <div id="description" disabled className={styles.textarea}>
                            
                            </div>
                            </form>
                        </div>

                        <div
                            style={{
                                marginTop:"50px",
                                display: "flex",
                                alignSelf: "flex-end",
                                alignContent: "end",
                                width: "100%",
                                height: "400px",
                                backgroundColor: "#FFF",
                            }}
                        >
                            <div className={styles.border_project_detail}>
                                <iframe
                                    width="660"
                                    height="400"
                                    src= {link_youtube}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
