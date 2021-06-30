import React from "react";

import Modal from "react-awesome-modal";
import styles from "./tutorial-management.css";
import iconExit from "../community/btnClose.png";
import ProjectItem from "../community/project-item.jsx";
import Grid from "@material-ui/core/Grid";
import TutorialItem from "./tutorial-item.js";
import TutorialDetail from './tutorial-detail.js';
import iconCodeKitten from '../menu-bar/mystuff.svg';

export default class TutorialManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = { spacing: 2, arrayItems: [] , isDetail:false, id:0,
             link_youtube:"", link_thumb:"",title:"", description:"" };
        this.closePopup = this.closePopup.bind(this);
        this.onCloseDetail = this.onCloseDetail.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.onShowDetail = this.onShowDetail.bind(this);
    }
    onShowDetail()
    {
        this.setState({isDetail: true});
    }
    showDetail(link_youtube, link_thumb, title, description)
    {
        console.log("ShowDetail");

        localStorage.setItem("link_thumb",link_thumb);
        localStorage.setItem("link_youtube",link_youtube);
        localStorage.setItem("title",title);
        localStorage.setItem("description",description);
        // this.setState({link_thumb:link_thumb});
        // this.setState({link_youtube:link_youtube});
        // this.setState({title: title});
        // this.setState({description: description});
        //this.setState({isDetail: true});
    }
    componentDidMount()
    {
        const requestOptions = {
            method: "GET"
        };
        fetch(
            "http://staging.teky.asia/api/v1/articles",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                const value = result.message;
                if (value.status_code == 200) 
                {
                    const data = result.data;
                    this.setState({arrayItems: data.articles});
                }
            })
    }

    closePopup() {
        this.props.closePopup();
    }

    onCloseDetail()
    {

        this.setState({isDetail:false});
    }

    render() {
        return (
            <Modal
                style={{ width: "100%" }}
                id="modal"
                name="modal"
                visible={true}
                effect="fadeInUp"
                onClickAway={() => this.closeModal()}
            >
                <view
                    id="viewid"
                    style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: "transparent",
                        width: "100%",
                        margin: 0,
                        padding: 0,
                        top: 0,
                        left: 0,
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <div
                        id="main"
                        style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            height: "100%",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            display: "flex",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                height: "70px",
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px",
                                background: "#1CC3A5",
                                backgroundImage:
                                    "linear-gradient(to right,#1CC3A5, #1CC3A5)",
                            }}
                        >
                            <div style={{ width: "100%", flex: 7, flexDirection:'row', display:'flex', justifyContent:'flex-start' }}>

                                <img style={{width:35, height:35, alignSelf:'center'}} src={iconCodeKitten} />
                                <div style={{marginLeft:10, alignSelf:'center', fontWeight:'bold', fontSize:'16px'}}>
                                <span>Danh sách video hướng dẫn</span>                                
                                </div>                            
                            </div>
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
                                        borderRadius: "15px",
                                        borderWidth: "5px",
                                        marginRight: "20px",
                                        backgroundColor: "#FFF",
                                    }}
                                >
                                    <input
                                        // onChange={this.onSearchProject}
                                        className={styles.input_search}
                                        style={{
                                            fontWeight: "lighter",
                                            flex: 10,
                                            width: "100%",
                                            marginLeft: "20px",
                                            marginRight: "10px",
                                            alignSelf: "center",
                                        }}
                                        placeholder="Tìm kiếm video"
                                    />
                                    <div
                                        className={styles.ico_search_codekitten}
                                    />
                                </div>
                            </div>

                            <img
                                onClick={this.closePopup}
                                style={{
                                    cursor: "pointer",
                                    zIndex: 100,
                                    marginRight: 5,
                                    width: 25,
                                    height: 25,
                                    alignSelf: "flex-start",
                                }}
                                src={iconExit}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            marginLeft: "20px",

                            marginRight: "20px",

                            height: "100%",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                            backgroundColor: "#FFF",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "526px",
                                overflowY: "scroll",
                            }}
                        >
                            <Grid
                                container
                                style={{ zIndex: 1, flexGrow: 1 }}
                                spacing={10}
                            >
                                <Grid item xs={20}>
                                    <Grid
                                        container
                                        justify="center"
                                        spacing={this.state.spacing}>
                                        {this.state.arrayItems.map((value) => (
                                            <Grid key={value} item>
                                                <div  onClick={()=> this.showDetail(value.link_youtube, value.link_thumb, value.title, value.short_description)} >

                                                <TutorialItem  onShowDetail = {this.onShowDetail}
                                                link_thumb = {value.page_img}
                                                 link_youtube = {value.link_youtube} 
                                                 title = {value.title}/>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    {this.state.isDetail?<TutorialDetail onCloseDetail={this.onCloseDetail} />:<div></div>}
                </view>
            </Modal>
        );
    }
}
