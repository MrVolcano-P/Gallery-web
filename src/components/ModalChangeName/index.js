import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Typography, Input } from 'antd'
import { Upload, message } from 'antd';
import { upload, addGallery, updateName } from '../../api/gallery';
import { useSelector } from 'react-redux';
import { InboxOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
export default (props) => {
    const history = useHistory()
    const token = useSelector(state => state.authToken)
    const UpdateName = () => {
        // console.log(props.name)
        updateName(props.galleryId, { Name: props.name }, token)
            .then(res => {
                console.log('Update name to', props.name)
                props.setVisible(false)
                props.fetchGallery()
            })
            .catch(err => console.log(err))
    };

    return (
        <Modal
            title="Update Name Gallery"
            visible={props.visible}
            footer={null}
            onCancel={() => props.setVisible(false)}
        >
            <>
                <Row>
                    <Typography.Text>Gallery Name</Typography.Text>
                    <br />
                    <Input value={props.name} onChange={(e) => props.setName(e.target.value)} />
                </Row>
                <br />
                <Row justify='center'>
                    <Button
                        onClick={UpdateName}
                    >
                        Add
                </Button>
                </Row>
            </>
        </Modal>
    )
}