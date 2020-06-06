import React, { useState, useEffect } from 'react'
import { Col, Row, Input } from 'antd';
import List from '../../components/List'
import ModalAddGallery from '../../components/ModalAddGallery'
import { listAllGalleries } from '../../api/gallery'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { faFileUpload, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TextHead = styled.h3`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    
`
const Search = styled.input`
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    background-color: #1b1b1b;
    border:1px solid rgba(31, 255, 255,0.19);
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 10px 0 rgba(31, 255, 255, 0.2);
    width:250px;
`
export default () => {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const [modalVisible, setModalVisible] = useState(false)
    const [key, setKey] = useState('')
    const [gallerys, setGallerys] = useState([])
    const fetchGallerys = () => {
        listAllGalleries()
            .then(data => {
                setGallerys(data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchGallerys()
    }, [])
    return (
        <>
            <Row justify={"center"} style={{ marginTop: 10, marginBottom: 5 }}>
                <Col span={14}>
                    <Row justify='center' align="middle">
                        <Col span={8} >
                            <TextHead>List All Gallery</TextHead>
                        </Col>
                        <Col span={8}>
                            <Search
                                placeholder="input search text"
                                onChange={(e) => setKey(e.target.value.toLowerCase())}
                            />
                        </Col>
                        <Col span={8}>
                            <Row justify='end'>
                                {token === null ?
                                    null
                                    :
                                    <b onClick={() => setModalVisible(true)}><FontAwesomeIcon icon={faFolderPlus} size='lg' color='white' /></b>
                                }
                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row >
            <Row justify={"center"}>
                <Col span={16}>
                    <List
                        data={gallerys.filter(g => g.name.toLowerCase().includes(key))}
                    />
                </Col>
            </Row>
            <ModalAddGallery
                visible={modalVisible}
                setVisible={setModalVisible}
            />
        </>
    )
}

