import React, { useState, useEffect, useCallback } from 'react'
import { List } from 'antd/lib/form/Form'
import { Typography, Divider, Table, Input, Button } from 'antd'
import { Card, Col, Row } from 'antd';
import ReactList from 'react-list';
import { ListGroup } from 'react-bootstrap'
import ListGallery from './list'
import { listAllGalleries, addGallery, deleteGallery, getGalleryByToken } from '../../api/gallery'
import { useSelector } from 'react-redux';
export default () => {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
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
    const AddGallery = useCallback(() => {
        addGallery({ Name: name }, token).then(() => fetchGallerys())
    }, [name])
    useEffect(() => {
        fetchGallerys()
    }, [])
    console.log(gallerys)
    return (
        <>
            <Row justify={"center"}>
                <Col span={20}>
                    {token === null ?
                        <>
                        </>
                        :
                        <Row justify={"center"}>
                            <Col>
                                <Typography.Title>List My Gallery </Typography.Title>
                            </Col>
                            {/* <Col>
                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                            </Col>
                            <Col>
                                &nbsp;&nbsp;<Button onClick={AddGallery}>Add</Button>
                            </Col> */}
                        </Row>
                    }

                </Col>
            </Row >
            <Row justify={"center"}>
                <Col span={16}>
                    <ListGallery
                        data={gallerys}
                    />
                </Col>
            </Row>

        </>
    )
}

