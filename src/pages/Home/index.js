import React, { useState, useEffect, useCallback } from 'react'
import { Typography, Divider, Table, Input, Button } from 'antd'
import { Card, Col, Row } from 'antd';
import ReactList from 'react-list';
import { ListGroup } from 'react-bootstrap'
import List from '../../components/List'
import ModalAddGallery from '../../components/ModalAddGallery'
import { listAllGalleries, addGallery, deleteGallery } from '../../api/gallery'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const TextHead = styled.h3`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    
`
export default () => {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const [modalVisible, setModalVisible] = useState(false)
    console.log('token', token)
    const [gallerys, setGallerys] = useState([])
    const fetchGallerys = () => {
        listAllGalleries()
            .then(data => {
                console.log(data)
                setGallerys(data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchGallerys()
    }, [])
    console.log(profile)
    return (
        <>
            <Row justify={"center"} style={{marginTop:10,marginBottom:5}}>
                <Col span={14}>
                    <Row justify='space-between' align="middle">
                        <Col>
                            {/* <Typography.Title level={2}>List All Gallery </Typography.Title> */}
                            <TextHead>List All Gallery</TextHead>
                        </Col>
                        <Col>
                            {token === null ?
                                null
                                :
                                <Button onClick={() => setModalVisible(true)} >Add</Button>
                            }
                        </Col>
                    </Row>

                </Col>
            </Row >
            <Row justify={"center"}>
                <Col span={16}>
                    <List
                        data={gallerys}
                    // delete={DeleteGallery}
                    />
                </Col>
            </Row>
            <ModalAddGallery
                visible={modalVisible}
                setVisible={setModalVisible}
            />
        </>
    )
}

