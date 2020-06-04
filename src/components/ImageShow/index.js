import React from 'react'
import { Row, Col, Card, Button } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { deleteImage, host } from '../../api/gallery';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const RowMain = styled(Row)`
    background-color: #1b1b1b;
    border:1px solid rgba(31, 255, 255,0.19);
    font-family: Roboto;
    font-weight: 700;
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(31, 255, 255, 0.19);
    &&:hover{
        background-color: #e2e2e2;
    }
`
export default (props) => {
    console.log(props.images)
    const token = useSelector(state => state.authToken)
    const DeleteImage = (filename) => {
        console.log(filename)
        let len = `${host}/upload/${props.galleryId}/`
        console.log(filename.slice(len.length))
        deleteImage(props.galleryId, filename.slice(len.length), token)
            .then(res => {
                console.log('success')
                props.fetchImages()
            })
            .catch(err => console.log(err))
    }
    return (
        <Row gutter={[16, 16]}>
            {props.images.map(i => {
                return (
                    <Col span={6} >
                        <RowMain>
                            <Col>
                                <Row style={{ width: 'auto', height: 300 }}>
                                    <img
                                        alt="example"
                                        src={i.src}
                                        style={{ width: "100%", height: "100%", objectFit: 'contain' }}
                                    />
                                </Row>
                                <Row justify='center'>
                                    <Col>
                                        <Button onClick={() => DeleteImage(i.src)}>Delete</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </RowMain>
                    </Col>
                )
            })
            }
        </Row>
    )
}
