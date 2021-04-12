
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { flex } from "to-style/src/prefixProperties";
import { ButtonToolbar } from "react-bootstrap";
import { Popup } from "reactjs-popup";
import bindAll from 'lodash.bindall';

import "reactjs-popup/dist/index.css";
import React from "react";
import Modal from "react-awesome-modal";
import iconCat from "./ic_cat.svg";
import iconExit from "./ic_exit.png";
import {setMyProject} from '../../reducers/mode';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import MenuBarHOC from '../../containers/menu-bar-hoc.jsx';

 class ShowMyProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: [] };
        bindAll(this, ['closePopup'] );
        this.state.user =
         [
            {
                id: 1,
                firstName: "Dong",
                lastName: "Ding",
                username: "Dinh Dong",
                age: 20,
                salary:
                    "https://www.tynker.com/projects/screenshot/562e5c26e0edb8284e8b4848/example-for-project.png",
            },
            {
                id: 2,
                firstName: "Dong",
                lastName: "Ding",
                username: "Dinh Dong",
                age: 20,
                salary:
                    "https://www.tynker.com/projects/screenshot/562e5c26e0edb8284e8b4848/example-for-project.png",
            },
            {
                id: 3,
                firstName: "Dong",
                lastName: "Ding",
                username: "Dinh Dong",
                age: 20,
                salary:
                    "https://www.tynker.com/projects/screenshot/562e5c26e0edb8284e8b4848/example-for-project.png",
            },
            {
                id: 4,
                firstName: "Dong",
                lastName: "Ding",
                username: "Dinh Dong",
                age: 20,
                salary:
                    "https://www.tynker.com/projects/screenshot/562e5c26e0edb8284e8b4848/example-for-project.png",
            },
            {
                id: 5,
                firstName: "Dong",
                lastName: "Ding",
                username: "Dinh Dong",
                age: 20,
                salary:
                    "https://www.tynker.com/projects/screenshot/562e5c26e0edb8284e8b4848/example-for-project.png",
            },
        ];
       // bindAll(this, ["closePopup"]);
    }
    closePopup() {

        console.log("Close Popup");
        this.props.closeMyProject(false);
    }
    render() {
        return (
            <Modal
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
                        overflow: "hidden",
                    }}
                >
                    <div
                        id="main"
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
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

                            
                            <img onClick={this.closePopup}
                            style={{
                                marginRight:5,
                                width: 20,
                                height: 20,
                                alignSelf: "center",

                            }}
                            src={iconExit}
                        />
                           
                        </div>

                        <Table
                            style={{
                                backgroundColor: "#FFF",
                                width: "100%",
                                height: "80%",
                                alignSelf: "center",
                                margin: 0,
                            }}
                        >
                            <TableHead style={{ backgroundColor: "#FFF" }}>
                                <TableRow>
                                    <TableCell
                                        style={{
                                            color: "#2d365d",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Id
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: "#2d365d",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Tên dự án
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: "#2d365d",
                                            fontWeight: "bold",
                                        }}
                                        align="right"
                                    >
                                        Mô tả
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: "#2d365d",
                                            fontWeight: "bold",
                                        }}
                                        align="right"
                                    >
                                        Thời gian tạo
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: "#2d365d",
                                            fontWeight: "bold",
                                        }}
                                        align="right"
                                    >
                                        Hình ảnh
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: "#2d365d",
                                            fontWeight: "bold",
                                        }}
                                        align="right"
                                    >
                                        Salary
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.user.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.firstName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.lastName}{" "}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.username}{" "}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.age}{" "}
                                        </TableCell>
                                        <TableCell align="right">
                                            {" "}
                                            <div>
                                                <img
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 5,
                                                    }}
                                                    src={row.salary}
                                                />
                                            </div>{" "}
                                        </TableCell>
                                        <TableCell align="right">
                                            <CreateIcon />
                                        </TableCell>
                                        <TableCell align="right">
                                            <DeleteIcon />{" "}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </view>
            </Modal>
        );
    }
}

ShowMyProject.propTypes = {
    closeMyProject: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    closeMyProject:()=> dispatch(setMyProject(false))
});
const mapStateToProps = (state, ownProps) => {


    return null;
}

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(
        null,
        mapDispatchToProps
    )
)(ShowMyProject);