import React, { useState, useEffect } from 'react'
import {  Col, Row } from 'antd';
import List from '../../components/List'
import {  getGalleryByToken } from '../../api/gallery'
import ModalAddGallery from '../../components/ModalAddGallery'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TextHead = styled.h3`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    
`
export default () => {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const [modalVisible, setModalVisible] = useState(false)
    console.log('token', token)
    const [name, setName] = useState('')
    const [gallerys, setGallerys] = useState([])
    const fetchGallerys = () => {
        getGalleryByToken(token)
            .then(data => {
                console.log(data)
                setGallerys(data.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchGallerys()
    }, [])
    console.log(gallerys)
    return (
        <>
            <Row justify={"center"} style={{ marginTop: 10, marginBottom: 5 }}>
                <Col span={14}>
                    <Row justify='space-between' align="middle">
                        <Col>
                            {/* <Typography.Title level={2}>List All Gallery </Typography.Title> */}
                            <TextHead>List My Gallery</TextHead>
                        </Col>
                        <Col>
                            {token === null ?
                                null
                                :
                                // <Button onClick={() => setModalVisible(true)} >Add</Button>
                                <b onClick={() => setModalVisible(true)}><FontAwesomeIcon icon={faFileUpload} size='lg' color='white' /></b>
                            }
                        </Col>
                    </Row>

                </Col>
            </Row >
            <Row justify={"center"}>
                <Col span={16}>
                    <List
                        data={gallerys}
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

