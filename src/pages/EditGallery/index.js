import React, { useState, useCallback, useEffect } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Typography, Row, Col, Button, Divider } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { getGalleryByid, getImagesByGalleryID } from '../../api/gallery';
export default (props) => {
    const token = useSelector(state => state.authToken)
    const [gallery, setGallery] = useState({})
    const [images, setImages] = useState([])
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

    useEffect(() => {
        fetchGallery()
    }, [])
    console.log(images)
    return (
        <>
            <Row justify='center'>
                <Col span={16}>
                    <Row style={{}} justify='space-between' align="middle">
                        <Col>
                            <Typography.Title level={3}>&nbsp;{gallery.name}</Typography.Title>
                        </Col>
                        <Col >
                            <Button>Add Images</Button>&nbsp;
                                <Button>Publish</Button>&nbsp;
                                <Button>Edit</Button>&nbsp;
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={20}>
                    <Gallery photos={images} />
                </Col>
            </Row>
            <Divider dashed />
        </>
    )
}
// const photos = [
//     {
//         src: "http://localhost:8080/upload/1/_X9QyTVRRAHXiWjM7LVR4Jzki7zY511YouJxEYO-HEc.jpg",
//         width: 4,
//         height: 3
//     },
//     {
//         src: "http://localhost:8080/upload\\1\\Vfd8AjVODxh2j2-gGGJ1mW3WzS_TYIXc_thSUbtXJ94.jpg",
//         width: 1,
//         height: 1
//     },
//     {
//         src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
//         width: 8,
//         height: 6
//     },
//     {
//         src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
//         width: 3,
//         height: 4
//     },
//     {
//         src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
//         width: 3,
//         height: 4
//     },
//     {
//         src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
//         width: 4,
//         height: 3
//     },
//     {
//         src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
//         width: 3,
//         height: 4
//     },
//     {
//         src: "https://source.unsplash.com/PpOHJezOalU/800x599",
//         width: 4,
//         height: 3
//     },
//     {
//         src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
//         width: 4,
//         height: 3
//     }
// ];