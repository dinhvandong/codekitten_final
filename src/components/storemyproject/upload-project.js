import { flex } from "to-style/src/prefixProperties";
import bindAll from "lodash.bindall";
import { projectTitleInitialState } from "../../reducers/project-title";
import "reactjs-popup/dist/index.css";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import downloadProject from "../../lib/download-project";
import saveproject from "./upload-project.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { setStoreMyProject } from "../../reducers/mode";

import "./upload-project.css";
class UploadProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectDesc: "",
        };
        bindAll(this, [
            "closePopup",
            "saveproject",
            "myChangeHandlerName",
            "myChangeHandlerDesc",
            "storeMyProject",
        ]);
        this.myChangeHandlerName.bind(this);
        this.myChangeHandlerDesc.bind(this);
        this.state ={
          file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    myChangeHandlerName(event) {
        this.setState({ projectName: event.target.value });
        console.log("projectName", event.target.value);
    }

    myChangeHandlerDesc(event) {
        this.setState({ projectDesc: event.target.value });
        console.log("projectDesc", event.target.value);
    }
    storeMyProject(name, desc) {
        this.props.saveProjectSb3().then((content) => {
            const fileName = `${name.substring(0, 100)}.sb3`;
            downloadProject(fileName, content, name, desc);
        });
    }
    onFormSubmit(e){
      e.preventDefault() // Stop form submit
      this.fileUpload(this.state.file).then((response)=>{
        console.log(response.data);
      })
    }
    onChange(e) {
      this.setState({file:e.target.files[0]})
    }
    saveproject(e) {
        e.preventDefault();
        this.storeMyProject(this.state.projectName, this.state.projectDesc);
        alert("Dự án lưu thành công !");
    }
    closePopup() {
        console.log("Close Popup");
        this.props.onClosePopup();
    }
    render() {
        return (
            <Modal id="modal" name="modal" visible={true} effect="fadeInUp">
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
                            width: 500,
                            height:600,
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
                                backgroundImage:
                                "linear-gradient(to right,#1CC3A5, #F9F154)",
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
                                onChange={this.myChangeHandlerName}
                            />

                            <label className={saveproject.label} for="name">
                                <b>Mô tả</b>
                            </label>
                            <textarea
                                onChange={this.myChangeHandlerDesc}
                                type="text"
                                placeholder="Mô tả thông tin về dự án"
                            ></textarea>

                            <form style={{backgroundImage:'red', width:'100%', height:'100px',marginBottom:'20px'}} onSubmit={this.onFormSubmit}>
                                <h3>Chọn tệp </h3>
                                <input  type="file" onChange={this.onChange} />
                            </form>

                            <div style={{display:'flex', marginTop:'50px', alignContent:'center', alignItems:'center', flexDirection:'row',marginTop:'20px'}}>

                            <button
                                className={saveproject.btn}
                                onClick={(e) => {
                                    this.saveproject(e);
                                }}
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
                            
                            </div>
                            
                        </form>
                    </div>
                </view>

                <div></div>
            </Modal>
        );
    }
}

UploadProject.propTypes = {
    onClosePopup: PropTypes.func
    // closeMyProject: PropTypes.func,
    // children: PropTypes.func,
    // className: PropTypes.string,
    // onSaveFinished: PropTypes.func,
    // projectFilename: PropTypes.string,
    // saveProjectSb3: PropTypes.func,
};

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

const mapDispatchToProps = (dispatch) => ({
   // closeMyProject: () => dispatch(setStoreMyProject(false)),
});
// const mapStateToProps = (state, ownProps) => {
//     return null;
// };

const mapStateToProps = (state) => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(
        state.scratchGui.vm
    ),
    projectFilename: getProjectFilename(
        state.scratchGui.projectTitle,
        projectTitleInitialState
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(UploadProject);
