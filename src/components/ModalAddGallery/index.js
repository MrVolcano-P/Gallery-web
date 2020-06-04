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
    const [antImages, setAntImages] = useState([]);
    const history = useHistory()
    const AddGallery = () => {
        // console.log(antImages[0])
        console.log(name)
        // if (name === '' || antImages.length < 6) {
        //     console.log('picture < 6')
        // } else {
        addGallery({ Name: name }, token)
            .then(res => {
                console.log(res.data)
                // history.push('/gallery/' + res.data.id)
                uploadImage(res.data.id)
            })
            .catch(err => console.log(err))
        // }
    }

    const propsDrag = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info)
                setAntImages(info.fileList.map((f) => f.originFileObj));
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const uploadImage = (id) => {
        const form = new FormData();
        for (let i = 0; i < antImages.length; i++) {
            form.append("photos", antImages[i]);
        }
        console.log(form)
        upload(id, form, token)
            .then((res) => {
                console.log('success')
                // props.fetchImages()
                // props.setVisible(false)
                history.push('/gallery/' + id)
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
                <Upload.Dragger {...propsDrag}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Upload.Dragger>
                <br />
                <Row justify='center'>
                    <Button
                        onClick={AddGallery}
                    >
                        Add
                </Button>
                </Row>
            </>
        </Modal>
    )
}
