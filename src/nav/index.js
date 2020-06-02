import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Dropdown } from 'antd';
import { Typography } from 'antd';
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { setAuthToken } from "../action/authToken";

const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer } = Layout;


export default () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.authToken)
    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={() => dispatch(setAuthToken(null))}>
                    LogOut
                </a>
            </Menu.Item>
        </Menu>
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
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button>bottomLeft</Button>
                        </Dropdown>
                    }

                </div>
            </Header>
        </Layout>
    )
}


