import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Dropdown, Row, Col } from 'antd';
import { Typography } from 'antd';
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppstoreOutlined, MailOutlined, SettingOutlined, CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import { setAuthToken } from "../action/authToken";
import { logout } from "../api/gallery";
import { setProfile } from "../action/profile";
import ModalAddGallery from '../components/ModalAddGallery'
import { faBuilding, faUserTie, faFileAlt, faTable, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const history = useHistory()
    const logOut = async () => {
        console.log('logout: ', token)
        logout(token)
            .then(res => {
                dispatch(setAuthToken(null))
                dispatch(setProfile(null))
                history.push("/")
            })
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={logOut}>
                    LogOut &nbsp;
                </a>
            </Menu.Item>
        </Menu >
    );
    return (
        <Row justify='space-between' align='middle' style={{ backgroundColor: '#1b1b1b' }}>
            <Col style={{ marginLeft: 20 }}>
                <Link to="/" >
                    <Typography.Title style={{ float: 'left', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Gallery</Typography.Title>
                </Link>
            </Col>
            <Col style={{ marginRight: 20 }}>
                {token === null ?
                    <Link to="/login" >
                        <Button>Login</Button>
                    </Link>
                    :
                    <>
                        <Link to="/gallery/owner/all" >
                            <Button><Typography.Text strong>My Gallery</Typography.Text></Button>
                        </Link>&nbsp;
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button><Typography.Text strong style={{ color: 'red' }}>{profile?.name}&nbsp;<FontAwesomeIcon icon={faCaretDown} /></Typography.Text></Button>
                        </Dropdown>&nbsp;
                    </>
                }
            </Col>
        </Row>
    )
}


