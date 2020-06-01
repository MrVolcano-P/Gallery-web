import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from 'antd';
import { Typography } from 'antd';
import { Link, NavLink } from "react-router-dom";
const { Title } = Typography;
const { Header, Content, Footer } = Layout;
export default () => {

    return (
        <Layout>
            <Header>
                <Link to="/" >
                    <Title style={{ float: 'left', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Gallery</Title>
                </Link>
                <div style={{ float: 'right' }}>
                    <Link to="/login" >
                        <Button>Login</Button>
                    </Link>
                </div>
            </Header>
        </Layout>
    )
}


