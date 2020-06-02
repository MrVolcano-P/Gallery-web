import React from 'react';
import { List, Typography, Checkbox, Space, Avatar, Row, Col } from 'antd'
import { Button } from 'antd'; import { Link } from 'react-router-dom';
import { faBuilding, faUserTie, faFileAlt, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            '',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export default function ListGallery(props) {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
            }}
            dataSource={props.data}
            renderItem={item => (
                <Row justify='start'>
                    <Col span={20}>
                        <Row>
                            <Typography.Title level={3}>
                                <Link to={"/gallery/" + item.id}>
                                    {item.name}
                                </Link></Typography.Title>
                        </Row>
                        <Row>
                            <Typography.Text>
                                <FontAwesomeIcon icon={faUserTie} />&nbsp;
                                {item.owner.name}
                            </Typography.Text>
                        </Row>
                    </Col>
                    <Col span={4} style={{ backgroundColor: 'red' }}>

                    </Col>
                </Row>
            )}
        />
    )
}
