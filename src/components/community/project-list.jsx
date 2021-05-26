import React from "react";
import Grid from "@material-ui/core/Grid";

export default class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { spacing: 2 , arrayItems:[] };
        const arrayProject = []
        for(var i = 0;i<15;i++)
        {
            arrayProject.push({name: "Dinh Dong", project:"ABC"});
        }
        this.state = { arrayProject };
        this.onShowDetail = this.onShowDetail.bind(this);
    }
    handleChange(event) {
        setSpacing(Number(event.target.value));
    }
    onShowDetail() {
        console.log("showDetailCCCC");
        this.props.onShowDetail();
    }

    render() {

        console.log("state.arrayItems", this.state.arrayProject.length);
        return (


            <Grid container style={{ zIndex: 1, flexGrow: 1 }} spacing={2}>
                <Grid item xs={12}>
                    <Grid
                        container
                        justify="center"
                        spacing={this.state.spacing}
                    >
                        {this.state.arrayProject.map((value) => (
                            <Grid key={value} item>
                                <div onClick={this.onShowDetail}>
                                    <ProjectItem />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

import styles from "./project-item.css";
import subject from "./uploads/img-info-subject.png";
class ProjectItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.c_project_courses__outer}>
                <div className={styles.c_project_courses_before}>
                    <div className={styles.c_is_project}>
                        <img
                            className={styles.c_is_project_img}
                            src={subject}
                        />
                    </div>

                    <div className={styles.c_titlebox_project}>
                        <div className={styles.c_titlebox_project__left}>
                            <span>Ninja siêu đẳng</span>
                        </div>

                        <div className={styles.c_titlebox_project__right}>
                            <i className={styles.icon_next_mysubject}></i>
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
                        <span>Bé làm game</span>
                    </div>
                </div>
            </div>
        );
    }
}
