import React from "react";
import styles from "./tutorial-item.css";

export default class TutorialItem extends React.Component {
    constructor(props) 
    {
        super(props);
        this.state = {link_youtube:"", title:""};
        // this.deleteProject = this.deleteProject.bind(this);
        this.onShowDetail = this.onShowDetail.bind(this);

        
    }

    onShowDetail()
    {
        this.props.onShowDetail();

    }
    componentDidUpdate()
    {
        // console.log("Link_YT", this.props.link_youtube);
        // this.setState({link_youtube: this.props.link_youtube});
        // this.setState({link_thumb: this.props.link_thumb});
        // this.setState({title: this.props.title});
    }
    // deleteProject()
    // {
    //     console.log("onDeleteProject");
    //     this.props.onDeleteProject();
    // }
    // onShowDetail()
    // {
    //     console.log("this.props.onShowDetail()");
    //     this.props.onSetShowDetail();
    // }
    render() {
        const link_youtube = this.props.link_youtube;
        const link_thumb = this.props.link_thumb;
        const title = this.props.title;
       // console.log("LINK_YOUTUBE", link_youtube);
        return (
            <div  style={{cursor:'pointer'}}  onClick={this.onShowDetail} className={styles.border_all}>
                <div className={styles.c_project_courses__outer}>
                    <div className={styles.c_project_courses_before}>
                        <div className={styles.c_is_project}>
                            <div style={{ width:"260px", height:"200px",
                            backgroundImage: "url(" + link_thumb + ")" , backgroundSize:'260px 200px' }}
                               >
                                </div>
                        </div>
                        <div style={{marginTop:'20px'}} className={styles.c_titlebox_project}>
                            <div style = {{height:'50px'}} className={styles.c_titlebox_project__left}>
                                <span>{`${title.substring(0, 50)}`}</span>
                            </div>
                        </div>
                        <div
                            style={{
                                marginLeft: "20px",
                                fontSize: 10,
                                fontWeight: "bold",
                                color: "#007bff",
                            }}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
