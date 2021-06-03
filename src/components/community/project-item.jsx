import React from "react";

import styles from "./project-item.css";

import subject from "./uploads/img-info-subject.png";
export default class ProjectItem extends React.Component {

    constructor(props) {
        super(props);

        this.deleteProject = this.deleteProject.bind(this);
        this.onShowDetail = this.onShowDetail.bind(this);
    }

    deleteProject()
    {
        console.log("onDeleteProject");
        this.props.onDeleteProject();



    }

    onShowDetail()
    {

        console.log("this.props.onShowDetail()");
        this.props.onSetShowDetail();
    }
    render() {
        return (
            <div className={styles.border_all}>
            <div className={styles.c_project_courses__outer} onClick={this.props.showDetail}>
                <div className={styles.c_project_courses_before}>
                    <div className={styles.c_is_project}>
                        <img
                            className={styles.c_is_project_img}
                            src={'data:image/png;base64,'+ this.props.thumb}
                        />
                    </div>

                    <div className={styles.c_titlebox_project}>
                        <div className={styles.c_titlebox_project__left}>
                            <span>{this.props.name}</span>
                        </div>

                        <div className={styles.c_titlebox_project__right}>
                            <i onClick={this.onShowDetail}  className={styles.icon_next_mysubject}></i>

                            {

                                this.props.isPublic === '1'?  
                                 <i onClick={this.deleteProject} className={styles.icon_delete_sprite}></i>:<div></div>

                            }

                        </div>
                    </div>

                    <div
                        style={{
                            marginLeft: "20px",
                            fontSize: 12,
                            fontWeight: "bold",
                            color: "#007bff",
                        }}
                    >
                        <span>{this.props.description}</span>
                    </div>
                </div>
            </div>
        
            </div>
            );
    }
}
