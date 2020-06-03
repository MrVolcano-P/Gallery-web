import React, { useState, useCallback, useEffect } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Typography, Row, Col, Button, Divider, Empty } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { getGalleryByid, getImagesByGalleryID, publishGallery, deleteGallery } from '../../api/gallery';
import { Link, useHistory } from 'react-router-dom';
export default (props) => {
    const token = useSelector(state => state.authToken)
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [gallery, setGallery] = useState({})
    const [images, setImages] = useState([])
    const history = useHistory()
    const fetchGallery = () => {
        getGalleryByid(props.match.params.id)
            .then(res => {
                console.log(res)
                setGallery(res.data)
                fetchImages(res.data.id)
            })
            .catch(err => console.log(err))
    }
    const fetchImages = (id) => {
        getImagesByGalleryID(id)
            .then(res => {
                // console.log(res.data)
                let temp = []
                res.data.map(d => {
                    temp.push({
                        src: "http://localhost:8080/" + d.filename,
                        width: getRandomInt(4, 7),
                        height: getRandomInt(3, 6),
                    })
                })
                console.log(temp)
                setImages(temp)
            })
            .catch(err => console.log(err))
    }
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    const PublishGallery = () => {
        publishGallery(gallery.id, { "is_publish": !gallery.is_publish }, token)
            .then(res => {
                console.log('set publish to ', !gallery.is_publish)
                fetchGallery()
            })
            .catch(err => console.log(err))
    }
    const DeleteGallery = useCallback(() => {
        deleteGallery(gallery.id, token)
            .then(res => {
                history.goBack()
            })
            .catch(err => console.log(err))
    }, [gallery.id, token])
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
                        <Col>
                            <Row>
                                <Typography.Title level={3}>&nbsp;{gallery.name}</Typography.Title>
                            </Row>
                            <Row>
                                {gallery.is_publish ?
                                    <Typography.Text >&nbsp;Published</Typography.Text>
                                    :
                                    <Typography.Text >&nbsp;Draft</Typography.Text>
                                }
                            </Row>
                        </Col>
                        <Col >
                            <Button onClick={PublishGallery}>Publish</Button>&nbsp;
                            <Link to={"/gallery/" + props.match.params.id + "/edit"}><Button>Edit</Button></Link>&nbsp;
                            <Button onClick={DeleteGallery}>Delete</Button>
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
                        <Gallery photos={images} onClick={openLightbox} />
                    }
                </Col>
            </Row>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={images.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
            <br />
            <br />
        </>
    )
}
