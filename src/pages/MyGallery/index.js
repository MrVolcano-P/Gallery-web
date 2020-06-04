import React, { useState, useEffect, useCallback } from 'react'
import { Typography, Divider, Table, Input, Button } from 'antd'
import { Card, Col, Row } from 'antd';
import ReactList from 'react-list';
import { ListGroup } from 'react-bootstrap'
import List from '../../components/List'
import { listAllGalleries, addGallery, deleteGallery, getGalleryByToken } from '../../api/gallery'
import ModalAddGallery from '../../components/ModalAddGallery'
import { useSelector } from 'react-redux';
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
            <Row justify={"center"}>
                <Col span={14}>
                    {token === null ?
                        <>
                        </>
                        :
                        <Row justify='space-between' align='middle'>
                            <Col>
                                <Typography.Title level={2}>List My Gallery </Typography.Title>
                            </Col>
                            <Col>
                                <Button onClick={() => setModalVisible(true)}>Add</Button>
                            </Col>
                        </Row>
                    }

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
            // galleryId={gallery.id}
            // fetchImages={() => fetchImages(gallery.id)} 
            />
        </>
    )
}

