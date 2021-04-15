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

    //  handleChangePage (event, newPage)
    //  {
    //   //setPage(newPage);
    //   console.log("handleChangePage", newPage);
    //   this.state.page = newPage;
    //   this.setState= {page : newPage};
    // };

    //  handleChangeRowsPerPage (event){
    //   //setRowsPerPage(parseInt(event.target.value, 10));
    //   //setPage(0);
    //   console.log("handleChangeRowsPerPage", parseInt(event.target.value, 10));

    //   this.state.rowsPerPage = parseInt(event.target.value, 10);
    //   this.state.page = 0;
    // };
    
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

    // updateInputValueProjectDesc(evt){
    //     //console.log("input field updated with "+evt.target.value);
    //     this.setState({projectDesc: evt.target.value});   
    //     console.log("projectDesc",evt.target.value) ;
    //   }
    storeMyProject (name, desc) {
       this.props.saveProjectSb3().then(content => {
       console.log("Content:", content);
            // if (this.props.onSaveFinished) {
            //     this.props.onSaveFinished();
            // }
           // downloadBlob(this.props.projectFilename, content);

           const fileName =  `${name.substring(0, 100)}.sb3`;

            downloadProject(fileName, content,name, desc ); 

            //export default (filename, blob, projectName, projectDesc) => {

       }); 
    }

    saveproject(e) 
    {
        e.preventDefault();

        this.storeMyProject(this.state.projectName, this.state.projectDesc);
        //const formData = new FormData();
        //formData.append("file", new File([blob], filename));
        //formData.append("name", this.state.projectName);
        //formData.append("projectDesc", this.state.projectDesc);
        //console.log("form data", formData);
        //const link_download = ConfigServer.host + "/api/project/create";
        // fetch(link_download, {
        //     method: "POST",
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log("Success:", result);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
    }

    closePopup() {
        console.log("Close Popup");
        this.props.closeMyProject(false);
    }
    render() {
        // this.setState= {page : newPage};
        return (
            <Modal
                id="modal"
                name="modal"
                visible={true}
                effect="fadeInUp"
                // onClickAway={() => this.closeModal()}
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
                                backgroundColor: "#2d365d",
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
                            <h2 style={{ color: "#2d365d" }}></h2>
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

                                onClick={(e) => {this.saveproject(e)}}
                            >
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
