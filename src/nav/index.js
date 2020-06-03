import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Dropdown } from 'antd';
import { Typography } from 'antd';
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppstoreOutlined, MailOutlined, SettingOutlined, CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import { setAuthToken } from "../action/authToken";
import { logout } from "../api/gallery";
import { setProfile } from "../action/profile";

const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer } = Layout;


export default () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const logOut = () => {
        console.log('logout')
        logout(token)
            .then(res => {
                dispatch(setAuthToken(null))
                dispatch(setProfile(null))
            })
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={logOut}>
                    LogOut &nbsp; <LogoutOutlined style={{ fontSize: '18px', color: '#08c' }} />
                </a>
            </Menu.Item>
        </Menu >
    );
    return (
        <Layout>
            <Header>
                <Link to="/" >
                    <Title style={{ float: 'left', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Gallery</Title>
                </Link>
                <div style={{ float: 'right' }}>
                    {token === null ?
                        <Link to="/login" >
                            <Button>Login</Button>
                        </Link>
                        :
                        <>
                            <Link to="/gallery/owner/all" ><Button>My Gallery</Button></Link>
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <Button>{profile.name}<CaretDownOutlined style={{ fontSize: '24px', color: '#08c' }} /></Button>
                            </Dropdown>
                        </>
                    }

                </div>
            </Header>
        </Layout>
    )
}


