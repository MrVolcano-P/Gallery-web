import React, { useState, useEffect, useCallback } from 'react'
import { List } from 'antd/lib/form/Form'
import { Typography, Divider, Table, Input, Button } from 'antd'
import { Card, Col, Row } from 'antd';
import ReactList from 'react-list';
import { ListGroup } from 'react-bootstrap'
import ListGallery from './list'
import { listGallery, addGallery, deleteGallery } from '../../../api/gallery'

export default function AdminHome() {
    const [name, setName] = useState('')
    const [gallerys, setGallerys] = useState([])
    const fetchTask = () => {
        listGallery()
            .then(data => {
                console.log(data)
                setGallerys(data.data)
            })
            .catch(err => console.log(err))
    }
    const AddGallery = useCallback(() => {
        addGallery({ Name: name }).then(() => fetchTask())
    }, [name])
    const DeleteGallery = useCallback((id) => {
        deleteGallery(id).then(() => fetchTask())
    })
    useEffect(() => {
        fetchTask()
    }, [])
    return (
        <Row justify={"center"}>
            <Col span={18}>
                <Row justify={"center"}>
                    <Col>
                        <Typography.Text>Gallery :&nbsp; </Typography.Text>
                    </Col>
                    <Col>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col>
                        &nbsp;&nbsp;<Button onClick={AddGallery}>Add</Button>
                    </Col>
                </Row>
                {/* <Row justify={"space-between"}> */}
                <ListGallery
                    data={gallerys}
                    delete={DeleteGallery}
                />
                {/* {tasks.map(t =>
                    <li key={t.id}>{t.task}</li>
                )} */}

                {/* </Row> */}
            </Col>

        </Row >
    )
}


const data = [
    {
        id: 1,
        todo: 'Buy Milk',
        completed: false,
    },
    {
        id: 2,
        todo: 'Buy Egg',
        completed: true,
    },
]
