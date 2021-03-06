import React, { useState, useCallback, useEffect } from 'react'
import { Row, Col, Divider, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getGalleryByid, getImagesByGalleryID, host, deleteImages, updateName, getGalleryByidAndCheckAuth, publishGallery, deleteGallery } from '../../api/gallery';
import { Link, useHistory } from 'react-router-dom';
import ModalAddImage from './modalAddImage';
import ModalChangeName from '../../components/ModalChangeName'
import _ from 'lodash'
import styled from 'styled-components';
import ImageShow from '../../components/ImageShow'
import { faArrowLeft, faTrash, faUpload, faGlobe, faShieldAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeftOutlined, UploadOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { Success } from '../../components/Message';
const TextHead = styled.h3`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    
`
export default (props) => {
    const token = useSelector(state => state.authToken)
    const [gallery, setGallery] = useState({})
    const [modalChangeVisible, setModalChangeVisible] = useState(false)
    const [images, setImages] = useState([])
    const [rawImage, setRawImage] = useState([])
    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()
    const fetchGallery = () => {
        getGalleryByid(props.location.state?.galId)
            .then(res => {
                setGallery(res.data)
                setName(res.data.name)
                fetchImages(res.data.id)
            })
            .catch(err => {
                Error('This Gallery is in draft mode')
                fetchGalleryAndCheckAuth()
            })
    }
    const fetchGalleryAndCheckAuth = () => {
        getGalleryByidAndCheckAuth(props.location.state?.galId, token)
            .then(res => {
                setGallery(res.data)
                setName(res.data.name)
                fetchImages(res.data.id)
            })
            .catch(err => {
                history.push('/')
                Error('Not have permission')
            })
    }
    const fetchImages = useCallback((id) => {
        getImagesByGalleryID(id)
            .then(res => {
                let temp = []
                res.data.map(d => {
                    temp.push({
                        src: `${host}/${d.filename}`,
                    })
                })
                setImages(temp)
            })
            .catch(err => console.log(err))
    }, [])


    const DeleteGallery = useCallback(() => {
        deleteGallery(gallery.id, token)
            .then(res => {
                history.push('/gallery/owner')
                Success('Deleted Gallery ' + gallery.name)
            })
            .catch(err => console.log(err))
    }, [gallery.id, token])

    useEffect(() => {
        fetchGallery()
    }, [])
    return (
        <>
            <Row justify='center'>
                <Col span={16}>
                    <Divider />
                    <Row style={{}} justify='space-between' align="middle">
                        <Col style={{ marginLeft: 20 }}>
                            <Link to={{ pathname:`/gallery`,state:{galId:props.location.state?.galId}}}>
                                <ArrowLeftOutlined style={{ fontSize: '24px', color: '#08c' }} />
                            </Link>
                        </Col>
                        <Col>
                            <Row>
                                <TextHead>
                                    {name}&nbsp;
                                    <b onClick={() => setModalChangeVisible(true)}>
                                        {/* <FontAwesomeIcon icon={faEdit} size='sm' color='white' /> */}
                                        <FormOutlined style={{ fontSize: '24px', color: 'white' }} />
                                    </b>
                                </TextHead>
                            </Row>
                        </Col>
                        <Col style={{ marginRight: 20 }}>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                                <b onClick={() => setModalVisible(true)}>
                                    <UploadOutlined style={{ fontSize: '24px', color: 'lightblue' }} />
                                </b>&nbsp;&nbsp;
                                <b onClick={DeleteGallery}>
                                    {/* <FontAwesomeIcon icon={faTrash} size='lg' color='white' /> */}
                                    <DeleteOutlined style={{ fontSize: '24px', color: 'red' }} />
                                </b>
                            </div>

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
                    <ModalChangeName
                        visible={modalChangeVisible}
                        setVisible={(v) => setModalChangeVisible(v)}
                        name={name}
                        galleryId={gallery.id}
                        fetchGallery={() => fetchGallery()}
                        setName={setName}
                    />
                </Col>
            </Row>
            <br />
            <br />
        </>
    )
}
