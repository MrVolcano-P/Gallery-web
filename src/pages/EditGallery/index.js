import React, { useState, useCallback, useEffect } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Typography, Row, Col, Button, Divider, Switch } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { getGalleryByid, getImagesByGalleryID } from '../../api/gallery';
import { Link } from 'react-router-dom';
import SelectedImage from './selectedImage';
import ModalAddImage from './modalAddImage';
export default (props) => {
    const token = useSelector(state => state.authToken)
    const [gallery, setGallery] = useState({})
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [images, setImages] = useState([])
    const [name, setName] = useState('')
    const [selectAll, setSelectAll] = useState(false);
    const [checked, setChecked] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const fetchGallery = () => {
        getGalleryByid(props.match.params.id)
            .then(res => {
                // console.log(res)
                setGallery(res.data)
                setName(res.data.name)
                fetchImages(res.data.id)
            })
            .catch(err => console.log(err))
    }
    const fetchImages = (id) => {
        getImagesByGalleryID(id)
            .then(res => {
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
    const onChange = str => {
        console.log('Content change:', str);
        setName(str)
    };
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <SelectedImage
                selected={selectAll ? true : false}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
            />
        ),
        [selectAll]
    );
    useEffect(() => {
        fetchGallery()
    }, [])
    console.log(name)
    return (
        <>
            <Row justify='center'>
                <Col span={16}>
                    <Row style={{}} justify='space-between' align="middle">
                        <Col>
                            <div style={{ display: 'flex' }}>
                                <Typography.Title editable={{ onChange: onChange }} level={3} type='secondary'>
                                    {name}
                                </Typography.Title>
                            </div>

                        </Col>
                        <Col>
                            <Typography.Text>Mode </Typography.Text>
                            <Switch checkedChildren="Delete" unCheckedChildren="View" onChange={(checked) => setChecked(checked)} />&nbsp;

                            {/* <Button onClick={toggleSelectAll}>toggle select all</Button> */}
                            {checked ?
                                <Button>Delete</Button>
                                :
                                null
                            }
                        </Col>
                        <Col >
                            <Button onClick={() => setModalVisible(true)}>Add Images</Button>&nbsp;
                            <Link to={"/gallery/" + props.match.params.id}><Button>Done</Button></Link>&nbsp;
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={20}>

                    {checked ?
                        <Gallery photos={images} renderImage={imageRenderer} />
                        :
                        <Gallery photos={images} onClick={openLightbox} />
                    }
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
                    <ModalAddImage visible={modalVisible} setVisible={(v) => setModalVisible(v)} />
                </Col>
            </Row>

            <br />
            <br />
        </>
    )
}
