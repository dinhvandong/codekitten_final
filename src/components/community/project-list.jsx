import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
export default class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { spacing: 2 };
        this.onShowDetail = this.onShowDetail.bind(this);
    }
    handleChange(event) {
        setSpacing(Number(event.target.value));
    }
    onShowDetail() {
        //console.log("showDetail",showDetail);
        this.props.onShowDetail;
    }

    render() {
        return (
            <Grid container style={{ zIndex: 1, flexGrow: 1 }} spacing={2}>
                <Grid item xs={12}>
                    <Grid
                        container
                        justify="center"
                        spacing={this.state.spacing}
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11].map((value) => (
                            <Grid key={value} item>
                                <div onClick={this.props.onShowDetail}>
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
