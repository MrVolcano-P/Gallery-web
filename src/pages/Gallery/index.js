import React, { useState, useEffect } from 'react'
import { Row, Col, Divider, Empty } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { getGalleryByid, getImagesByGalleryID, getGalleryByidAndCheckAuth, host, publishGallery } from '../../api/gallery';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ResponsiveGallery from 'react-responsive-gallery';
import { faArrowLeft, faEdit, faShieldAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TextHead = styled.h3`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    
`
export default (props) => {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const [gallery, setGallery] = useState({})
    const [images, setImages] = useState([])
    const history = useHistory()
    const fetchGallery = () => {
        getGalleryByid(props.match.params.id)
            .then(res => {
                console.log(res.data)
                setGallery(res.data)
                fetchImages(res.data.id)
            })
            .catch(err => {
                console.log('error')
                fetchGalleryAndCheckAuth()
            })
    }
    const fetchGalleryAndCheckAuth = () => {
        getGalleryByidAndCheckAuth(props.match.params.id, token)
            .then(res => {
                setGallery(res.data)
                fetchImages(res.data.id)
            })
            .catch(err => {
                console.log(err)
                console.log('error in auth')
                history.push('/')
            })
    }
    const fetchImages = (id) => {
        getImagesByGalleryID(id)
            .then(res => {
                // console.log(res.data)
                let temp = []
                res.data.map(d => {
                    temp.push({
                        src: `${host}/${d.filename}`,
                    })
                })
                console.log(temp)
                setImages(temp)
            })
            .catch(err => console.log(err))
    }

    const CheckAuth = () => {
        if (token === null) {
            return true
        } else {
            if (gallery?.owner?.id === profile?.id) {
                return false
            } else {
                return true
            }
        }
    }
    const PublishGallery = () => {
        publishGallery(gallery.id, { "is_publish": !gallery.is_publish }, token)
            .then(res => {
                console.log('set publish to ', !gallery.is_publish)
                fetchGallery()
            })
            .catch(err => console.log(err))
    }
    console.log(CheckAuth())
    useEffect(() => {
        fetchGallery()
    }, [])
    console.log()
    return (
        <>
            <Row justify='center'>
                <Col span={16}>
                    <Divider />
                    <Row style={{}} justify='space-between' align="middle">
                        <Col style={{ marginLeft: 20 }}>
                            <Link to='/'>
                                <FontAwesomeIcon icon={faArrowLeft} size='lg' />
                            </Link>
                        </Col>
                        <Col>
                            <Row>
                                <TextHead>{gallery.name}</TextHead>
                            </Row>
                        </Col>
                        <Col style={{ marginRight: 20 }}>
                            {CheckAuth() ?
                                null
                                :
                                <>
                                    {!gallery.is_publish ?
                                        <b onClick={PublishGallery}><FontAwesomeIcon icon={faShieldAlt} size='lg' color='blue' /></b>
                                        :
                                        <b onClick={PublishGallery}><FontAwesomeIcon icon={faGlobe} size='lg' color='blue' /></b>
                                    }&nbsp;&nbsp;
                                <Link to={`/gallery/${props.match.params.id}/edit`}>
                                        <FontAwesomeIcon icon={faEdit} size='lg' />
                                    </Link>
                                </>

                            }

                        </Col>
                    </Row>
                    <Divider />
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={20}>
                    {images.length === 0 ?
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        :
                        // <Gallery photos={images} onClick={openLightbox} />
                        <ResponsiveGallery images={images} useLightBox={true} />
                    }
                </Col>
            </Row>
        </>
    )
}
