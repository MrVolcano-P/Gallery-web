import React from 'react';
import { List, Typography, Checkbox, Space, Avatar, Row, Col } from 'antd'
import { Button } from 'antd'; import { Link } from 'react-router-dom';
import { faBuilding, faUserTie, faFileAlt, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment'
export default (props) => {
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
                        <Row>
                            {item.is_publish ?
                                <Typography.Text>
                                    Status &nbsp; Published
                                </Typography.Text>
                                :
                                <Typography.Text>
                                    Status &nbsp; Draft
                                </Typography.Text>
                            }
                        </Row>
                        <Row>
                            Created {moment(item.createAt).format('D MMM YYYY')}
                        </Row>
                    </Col>
                </Row>
            )}
        />
    )
}