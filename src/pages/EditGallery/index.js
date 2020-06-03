import React, { useState, useCallback, useEffect } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Typography, Row, Col, Button, Divider, Switch } from 'antd';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getGalleryByid, getImagesByGalleryID, host, deleteImages, updateName } from '../../api/gallery';
import { Link } from 'react-router-dom';
import SelectedImage from './selectedImage';
import ModalAddImage from './modalAddImage';
import _ from 'lodash'
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
                setRawImage(res.data)
                let temp = []
                res.data.map(d => {
                    temp.push({
                        src: host + "/" + d.filename,
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
        updateName(gallery.id, { Name: str }, token)
            .then(res => {
                console.log('Update name to', str)
                setName(str)
            })
            .catch(err => console.log(err))
    };
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };
    const AddTodel = useCallback((p) => {
        let temp = deleteTemp
        temp.push(p)
        setDeleteTemp(temp)
        console.log('add')
    }, []);
    const RemoveFromDel = useCallback((p) => {
        console.log('remove')
        _.remove(deleteTemp, d => d === p)
    })
    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <SelectedImage
                selected={selectAll ? true : false}
                key={key}
                margin={"1px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
                addTodel={(p) => AddTodel(p)}
                removeFromdel={(p) => RemoveFromDel(p)}
            />
        ),
        []
    );

    const DeleteImages = () => {
        console.log('showdel', deleteTemp)
        // console.log(token)
        deleteImages(gallery.id, { filenames: deleteTemp }, token)
            .then((res) => {
                console.log('success')
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
                                <Button onClick={DeleteImages}>Delete</Button>
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
