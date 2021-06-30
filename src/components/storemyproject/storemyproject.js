import { flex } from "to-style/src/prefixProperties";
import bindAll from "lodash.bindall";
import { projectTitleInitialState } from "../../reducers/project-title";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import downloadProject from "../../lib/download-project";
import saveproject from "./saveproject.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { setStoreMyProject } from "../../reducers/mode";
import SimpleReactFileUpload from "./react-file-upload";
import Switch from "react-switch";

class StoreMyProject extends React.Component {
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
        this.onChangeCover = this.onChangeCover.bind(this);
        this.state = { cover: null };
        this.state = { isPublic: false };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("update_project", localStorage.getItem("update_project"));
        if (localStorage.getItem("update_project") === "true") {
            const name_project = localStorage.getItem("name");
            const description = localStorage.getItem("description");
            const is_public = localStorage.getItem("is_public");
            this.setState({ isPublic: is_public });
            console.log("name_project", localStorage.getItem("name"));
            console.log("description", localStorage.getItem("description"));
            this.setState({ projectName: name_project });
            this.setState({ projectDesc: description });
        }
    }
    handleChange() {
        this.setState({ isPublic: !this.state.isPublic });
        console.log("CheckPublic", this.state.isPublic);
    }
    myChangeHandlerName(event) {
        this.setState({ projectName: event.target.value });
        console.log("projectName", event.target.value);
    }

    myChangeHandlerDesc(event) {
        this.setState({ projectDesc: event.target.value });
        console.log("projectDesc", event.target.value);
    }
    storeMyProject(name, desc, cover) {
        this.props.saveProjectSb3().then((content) => {
            const fileName = `${name.substring(0, 100)}.sb3`;
            downloadProject(
                fileName,
                content,
                name,
                desc,
                cover,
                this.state.isPublic
            );
        });
    }

    saveproject(e) {
        e.preventDefault();
        this.storeMyProject(
            this.state.projectName,
            this.state.projectDesc,
            this.state.cover
        );
        //alert("Dự án lưu thành công !");
        this.props.closePopup();
    }

    onChangeCover(e) {
        localStorage.setItem("update_cover", true);
        this.setState({ cover: e.target.files[0] });
    }

    closePopup(e) {
        // e.preventDefault();
        console.log("Close Popup");
        this.props.closePopup();
        // this.props.closeMyProject(false);
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
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div
                        id="main"
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            width: "500px",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundImage:
                                    "linear-gradient(to right,#1CC3A5, #1CC3A5)",
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
                                value={this.state.projectName}
                                type="text"
                                placeholder="Tên dự án"
                                onChange={this.myChangeHandlerName}
                            />
                            <label className={saveproject.label} for="name">
                                <b>Mô tả</b>
                            </label>
                            <textarea
                                value={this.state.projectDesc}
                                onChange={this.myChangeHandlerDesc}
                                type="text"
                                placeholder="Mô tả thông tin về dự án"
                            ></textarea>
                            <h6 style={{ marginTop: "10px" }}>
                                Chọn ảnh bìa(400x400){" "}
                            </h6>
                            <input type="file" onChange={this.onChangeCover} />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: "20px",
                                }}
                            >
                                <Switch
                                    onChange={this.handleChange}
                                    checked={this.state.isPublic}
                                />
                                <span style={{ marginLeft: "10px" }}>
                                    Chia sẻ với cộng đồng
                                </span>
                            </div>

                            <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "20px",
                            }}
                        >
                            <Switch
                                onChange={this.handleChange}
                                checked={this.state.isPublic}
                            />
                            <span style={{ marginLeft: "10px" }}>
                                Tham gia cuộc thi
                            </span>
                        </div>
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: "100px",
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    marginTop: "20px",
                                }}
                            >
                                <button
                                    type="submit"
                                    className={saveproject.btn}
                                    onClick={this.saveproject}
                                >
                                    Lưu dự án
                                </button>
                                <button
                                    type="submit"
                                    className={saveproject.cancel}
                                    onclick={this.closePopup}
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

StoreMyProject.propTypes = {
    closePopup: PropTypes.func,
    setShow: PropTypes.func,

    //closeMyProject: PropTypes.func,
    children: PropTypes.func,
    className: PropTypes.string,
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func,
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

const mapStateToProps = (state) => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(
        state.scratchGui.vm
    ),
    projectFilename: getProjectFilename(
        state.scratchGui.projectTitle,
        projectTitleInitialState
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreMyProject);