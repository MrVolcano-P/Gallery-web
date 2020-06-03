import React, { useState } from 'react'
import { Modal, Button, Row, Typography, Input } from 'antd'
import { Upload, message } from 'antd';
import { upload, addGallery } from '../../api/gallery';
import { useSelector } from 'react-redux';
import { InboxOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
export default (props) => {
    const token = useSelector(state => state.authToken)
    const [name, setName] = useState('')
    const history = useHistory()
    const AddGallery = () => {
        console.log(name)
        addGallery({ Name: name }, token)
            .then(res => {
                console.log(res.data)
                history.push('/gallery/' + res.data.id)
            })
            .catch(err => console.log(err))
    }
    return (
        <Modal
            title="Add Gallery"
            visible={props.visible}
            footer={null}
            onCancel={() => props.setVisible(false)}
        >
            <>
                <Row>
                    <Typography.Text>Name</Typography.Text>
                    <Input onChange={(e) => setName(e.target.value)} />
                </Row>
                <br></br>
                <Row justify='center'>
                    <Button
                        onClick={AddGallery}
                    >
                        Upload
                </Button>
                </Row>
            </>
        </Modal>
    )
}
