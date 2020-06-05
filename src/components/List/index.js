import React from 'react';
import { List, Typography, Checkbox, Space, Avatar, Row, Col } from 'antd'
import { Button } from 'antd'; import { Link } from 'react-router-dom';
import { faBuilding, faUserTie, faFileAlt, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment'
import styled from 'styled-components';

export default (props) => {
    const RowCus = styled(Row)`
    color:#fff;
    background-color: #1b1b1b;
    border:1px solid rgba(31, 255, 255,0.19);
    font-family: Roboto;
    font-weight: 700;
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(31, 255, 255, 0.19);
    &&:hover{
        background-color: #e2e2e2;
        color:#000
    }
`
    const Text = styled.p`
    font-size:20;
`   
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={props.data.length < 6 ? null : {
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
            }}
            dataSource={props.data}
            renderItem={item => (
                <Link to={`/gallery/${item.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <RowCus align='middle' style={{ height: 100, marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10 }}>
                        <Col span={20}>
                            <Row style={{ marginLeft: 30 }}>

                                {/* <Typography.Text style={{ fontSize: 20, color: 'black' }}> */}
                                <b style={{ color: 'inherit', textDecoration: 'inherit', fontSize: 24 }}>{item.name}</b>

                                {/* </Typography.Text> */}

                            </Row>
                            <Row style={{ marginLeft: 30 }}>
                                {/* <Typography.Text> */}
                                <FontAwesomeIcon icon={faUserTie} />&nbsp;
                                {item.owner.name}
                                {/* </Typography.Text> */}
                            </Row>

                        </Col>
                        <Col span={4}>
                            <Row>
                                {item.is_publish ?
                                    <>
                                        Status &nbsp; Published
                                    </>
                                    :
                                    <>
                                        Status &nbsp; Draft
                                    </>
                                }
                            </Row>
                            <Row>
                                Created {moment(item.createAt).format('D MMM YYYY')}
                            </Row>
                        </Col>

                    </RowCus>
                </Link>
            )}
        />
    )
}