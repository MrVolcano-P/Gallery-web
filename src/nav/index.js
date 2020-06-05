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
import { faBuilding, faUserTie, faFileAlt, faTable, faCaretDown, faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Success } from "../components/Message";
const MenuButton = styled(Button)`
    color:#fff;
    background-color: #1b1b1b;
    border:2px solid rgba(31, 255, 255,0.19);
    font-family: Roboto;
    font-weight: 700;
    &&:hover{
        background-color: #e2e2e2;
        color:#000
    }
`
const MeNu = styled(Menu)`
color:#fff;
    background-color: #1b1b1b;
    border:1px solid rgba(31, 255, 255,0.19);
    font-family: Roboto;
    font-weight: 700;
    height:100%;
    &&:hover{
        background-color: #e2e2e2;
        color:#000
    }
`
const MenuItem = styled(Menu.Item)`
color:#fff;
    background-color: #1b1b1b;
    font-family: Roboto;
    font-weight: 700;
    height:100%;
    &&:hover{
        background-color: #e2e2e2;
        color:#000
    }
`
const Br = styled.div`
    border-bottom:2px solid white;
`
const TextHead = styled(Typography.Title)`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
`
export default () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const history = useHistory()
    const logOut = async () => {
        logout(token)
            .then(res => {
                dispatch(setAuthToken(null))
                dispatch(setProfile(null))
                history.push("/")
                Success('GoodBye')
            })
    }
    const menu = (
        <MeNu>
            <MenuItem>
                <a onClick={() => history.push('/user/profile')}>
                    <Row justify='space-between'>
                        EditProfile
                        <FontAwesomeIcon icon={faUserEdit} />
                    </Row>
                </a>
            </MenuItem>
            <Br />
            <MenuItem>
                <a onClick={logOut}>
                    <Row justify='space-between'>
                        Signout
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </Row>

                </a>
            </MenuItem>
        </MeNu >
    );
    useEffect(() => {
        
    }, [])
    return (
        <Row justify='space-between' align='middle' style={{ backgroundColor: '#1b1b1b' }}>
            <Col style={{ marginLeft: 20 }}>
                <Link to="/" >
                    <TextHead level={2} style={{ float: 'left',color:'#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Gallery Hub</TextHead>
                </Link>
            </Col>
            <Col style={{ marginRight: 20 }}>
                {token === null ?
                    <Link to="/login" >
                        <MenuButton>Login</MenuButton>
                    </Link>
                    :
                    <>
                        <Link to="/gallery/owner" >
                            <MenuButton><p>My Gallery</p></MenuButton>
                        </Link>&nbsp;
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <MenuButton><p>{profile?.name}&nbsp;<FontAwesomeIcon icon={faCaretDown} /></p></MenuButton>
                        </Dropdown>&nbsp;
                    </>
                }
            </Col>
        </Row>
    )
}


