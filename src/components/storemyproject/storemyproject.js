import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";

import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { flex } from "to-style/src/prefixProperties";
import { ButtonToolbar } from "react-bootstrap";
import { Popup } from "reactjs-popup";
import bindAll from "lodash.bindall";
import {projectTitleInitialState} from '../../reducers/project-title';
// reducers/project-title';

import "reactjs-popup/dist/index.css";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import downloadProject from '../../lib/download-project';

import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from "react-intl";
import MenuBarHOC from "../../containers/menu-bar-hoc.jsx";
import { Paper, TablePagination } from "@material-ui/core";
import { autoUpdateProject } from "../../reducers/project-state";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import saveproject from "./saveproject.css";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { setStoreMyProject } from "../../reducers/mode";

class StoreMyProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName:"", 
            projectDesc:""
        };
        bindAll(this, ["closePopup", 
        "saveproject",
        "myChangeHandlerName",
        "myChangeHandlerDesc","storeMyProject"
    ]);
    this.myChangeHandlerName.bind(this);
    this.myChangeHandlerDesc.bind(this);
    }

    myChangeHandlerName (event)
      {
        this.setState({projectName: event.target.value});
        console.log("projectName",event.target.value);
      }

      myChangeHandlerDesc(event)
      {
        this.setState({projectDesc: event.target.value});
        console.log("projectDesc",event.target.value);
      }
    storeMyProject (name, desc) {
       this.props.saveProjectSb3().then(content => {
        const fileName =  `${name.substring(0, 100)}.sb3`;
        downloadProject(fileName, content,name, desc ); 
       }); 
    }

    saveproject(e) 
    {
        e.preventDefault();
        this.storeMyProject(this.state.projectName, this.state.projectDesc);
        alert("Dự án lưu thành công !");
    }       

    closePopup() 
    {
        console.log("Close Popup");
        this.props.closeMyProject(false);
    }
    render() 
    {
        return (
            <Modal
                id="modal"
                name="modal"
                visible={true}
                effect="fadeInUp"
            >
                <view
                    id="viewid"
                    style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <div
                        id="main"
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            display: flex,
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: "#1CC3A5",
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                height: 50,
                            }}
                        >
                            <img
                                style={{
                                    width: 35,
                                    height: 35,
                                    alignSelf: "center",
                                }}
                                src={iconCat}
                            />
                            <text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    alignSelf: "center",
                                    color: "white",
                                    height: "100%",
                                    width: "100%",
                                    marginTop: 25,
                                }}
                            >
                                Code Kitten Project
                            </text>
                            <img
                                onClick={this.closePopup}
                                style={{
                                    marginRight: 5,
                                    width: 20,
                                    height: 20,
                                    alignSelf: "center",
                                }}
                                src={iconExit}
                            />
                        </div>

                        <form className={saveproject.formcontainer}>
                            <h2 style={{ color: "#1CC3A5" }}></h2>
                            <label className={saveproject.label} for="name">
                                <b>Tên dự án</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Tên dự án"
                                onChange ={this.myChangeHandlerName}
                            />

                            <label className={saveproject.label} for="name">
                                <b>Mô tả</b>
                            </label>
                            <textarea
                                onChange ={this.myChangeHandlerDesc}
                                type="text"
                                placeholder="Mô tả thông tin về dự án"
                            ></textarea>
                            <button
                                //type="submit"
                                className={saveproject.btn}
                                //onClick={this.saveproject}
                                onClick={(e) => {this.saveproject(e)}}>
                                Lưu dự án
                            </button>
                            <button
                                type="button"
                                className={saveproject.cancel}
                                onclick="closeForm()"
                            >
                                Huỷ
                            </button>
                        </form>
                    </div>
                </view>
            
                <div>


                </div>
                </Modal>
        );
    }
}

StoreMyProject.propTypes = {
    closeMyProject: PropTypes.func,
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func
};


const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

const mapDispatchToProps = (dispatch) => ({
    closeMyProject: () => dispatch(setStoreMyProject(false)),
});
// const mapStateToProps = (state, ownProps) => {
//     return null;
// };

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

// export default compose(
//     injectIntl,
//     MenuBarHOC,
//     connect(mapStateToProps, mapDispatchToProps)
// )(StoreMyProject);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreMyProject);

/**
 * 
 * SB3Downloader.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func
};
SB3Downloader.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SB3Downloader);

 */
