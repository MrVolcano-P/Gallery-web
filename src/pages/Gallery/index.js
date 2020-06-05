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
import { EyeInvisibleOutlined, EyeOutlined, EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Success } from '../../components/Message';
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
        getGalleryByid(props.location.state?.galId)
            .then(res => {
                setGallery(res.data)
                fetchImages(res.data.id)
            })
            .catch(err => {
                console.log('error')
                fetchGalleryAndCheckAuth()
            })
    }
    const fetchGalleryAndCheckAuth = () => {
        getGalleryByidAndCheckAuth(props.location.state?.galId, token)
            .then(res => {
                setGallery(res.data)
                fetchImages(res.data.id)
            })
            .catch(err => {
                console.log(err)
                history.push('/')
            })
    }
    const fetchImages = (id) => {
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
                fetchGallery()
                {
                    !gallery.is_publish ?
                        Success('Gallery Published')
                        :
                        Success('Gallery Back To Draft Mode')
                }
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
                        <Col style={{ marginLeft: 20 }}>
                            <div onClick={() => { gallery.is_publish ? history.push('/') : history.push('/gallery/owner') }}>
                                <ArrowLeftOutlined style={{ fontSize: '24px', color: '#08c' }} />
                            </div>
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
                                        <b onClick={PublishGallery}><EyeInvisibleOutlined style={{ fontSize: '24px', color: 'red' }} /></b>
                                        :
                                        <b onClick={PublishGallery}><EyeOutlined style={{ fontSize: '24px', color: 'green' }} /></b>
                                    }&nbsp;&nbsp;
                                <Link to={{ pathname:`/gallery/edit`,state:{galId:props.location.state.galId}}}>
                                        <EditOutlined style={{ fontSize: '24px', color: 'white' }} />
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
                        <div>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                        :
                        <ResponsiveGallery images={images} useLightBox={true} />
                    }
                </Col>
            </Row>
        </>
    )
}
