import React, { useState, useCallback, useEffect } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Typography, Row, Col, Button, Divider, Switch } from 'antd';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getGalleryByid, getImagesByGalleryID, host, deleteImages, updateName, getGalleryByidAndCheckAuth } from '../../api/gallery';
import { Link, useHistory } from 'react-router-dom';
import ModalAddImage from './modalAddImage';
import _ from 'lodash'
import styled from 'styled-components';
import ImageShow from '../../components/ImageShow'
const TextHead = styled.h3`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    
`
export default (props) => {
    const token = useSelector(state => state.authToken)
    const [gallery, setGallery] = useState({})
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [images, setImages] = useState([])
    const [rawImage, setRawImage] = useState([])
    const [name, setName] = useState('')
    const [selectAll, setSelectAll] = useState(false);
    const [checked, setChecked] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [deleteTemp, setDeleteTemp] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()
    const fetchGallery = () => {
        getGalleryByid(props.match.params.id)
            .then(res => {
                console.log(res.data)
                setGallery(res.data)
                setName(res.data.name)
                fetchImages(res.data.id)
            })
            .catch(err => {
                console.log(err.data)
                console.log('error')
                fetchGalleryAndCheckAuth()
            })
    }
    const fetchGalleryAndCheckAuth = () => {
        getGalleryByidAndCheckAuth(props.match.params.id, token)
            .then(res => {
                setGallery(res.data)
                setName(res.data.name)
                fetchImages(res.data.id)
            })
            .catch(err => {
                console.log(err)
                console.log('error in auth')
                history.push('/')
            })
    }
    const fetchImages = useCallback((id) => {
        getImagesByGalleryID(id)
            .then(res => {
                setRawImage(res.data)
                let temp = []
                res.data.map(d => {
                    let w = Math.floor(Math.random() * 7) + 4
                    let h = Math.floor(Math.random() * 6) + 3
                    console.log("w: ", w);
                    let object = {
                        src: host + "/" + d.filename,
                        maxWidth: 4,
                        height: 3,
                    }
                    temp.push(object)
                })
                console.log('test: ', temp)
                setImages(temp)
            })
            .catch(err => console.log(err))
    }, [])

    const onChange = str => {
        console.log('Content change:', str);
        setName(str)
        updateName(gallery.id, { Name: str }, token)
            .then(res => {
                console.log('Update name to', str)
                setName(str)
            })
            .catch(err => console.log(err))
    };
    
    const DeleteImages = () => {
        console.log('showdel', deleteTemp)
        // console.log(token)
        deleteImages(gallery.id, { filenames: deleteTemp }, token)
            .then((res) => {
                console.log('success')
                fetchImages(gallery.id)
                // props.fetchImages()
                // props.setVisible(false)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchGallery()
    }, [])
    return (
        <>
            <Row justify='center'>
                <Col span={16}>
                    <Divider />
                    <Row style={{}} justify='space-between' align="middle">
                        <Col>
                            <Row>
                                <TextHead editable={{ onChange: onChange }} level={3} >
                                    {name}
                                </TextHead>
                            </Row>
                            {/* <Row>
                                {gallery.is_publish ?
                                    <Typography.Text >&nbsp;Published</Typography.Text>
                                    :
                                    <Typography.Text >&nbsp;Draft</Typography.Text>
                                }
                            </Row> */}
                        </Col>
                        {/* <Col>
                            <Typography.Text>Mode </Typography.Text>
                            <Switch checkedChildren="Delete" unCheckedChildren="View" onChange={(checked) => setChecked(checked)} />&nbsp;

                            
                            {checked ?
                                <Button onClick={DeleteImages}>Delete</Button>
                                :
                                null
                            }
                        </Col> */}
                        <Col >
                            <Button onClick={() => setModalVisible(true)}>Add Images</Button>&nbsp;
                            <Link to={"/gallery/" + props.match.params.id}><Button>Done</Button></Link>&nbsp;
                        </Col>
                    </Row>
                    <Divider />
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={20}>
                    <ImageShow images={images}
                        galleryId={gallery.id}
                        fetchImages={() => fetchImages(gallery.id)}
                    />
                    <ModalAddImage
                        visible={modalVisible}
                        setVisible={(v) => setModalVisible(v)}
                        galleryId={gallery.id}
                        fetchImages={() => fetchImages(gallery.id)}
                    />
                </Col>
            </Row>

            <br />
            <br />
        </>
    )
}
