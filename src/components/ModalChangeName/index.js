import React from 'react'
import { Modal, Button, Row, Typography, Input } from 'antd'
import {  updateName } from '../../api/gallery';
import { useSelector } from 'react-redux';
import { Success } from '../Message';
export default (props) => {
    const token = useSelector(state => state.authToken)
    const UpdateName = () => {
        updateName(props.galleryId, { Name: props.name }, token)
            .then(res => {
                props.setVisible(false)
                props.fetchGallery()
                Success('Gallery Name Updated')
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