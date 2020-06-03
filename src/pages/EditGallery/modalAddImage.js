import React, { useState } from 'react'
import { Modal, Button, Row } from 'antd'
import { Upload, message } from 'antd';
import { upload } from '../../api/gallery';
import { useSelector } from 'react-redux';
export default function ModalAddImage(props) {
    const token = useSelector(state => state.authToken)
    const [antImages, setAntImages] = useState([]);
    const propsDrag = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
                // console.log('filelist', info.fileList)
                setAntImages(info.fileList.map((f) => f.originFileObj));
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const uploadImage = () => {
        console.log(antImages);
        const form = new FormData();
        for (let i = 0; i < antImages.length; i++) {
            form.append("photos", antImages[i]);
        }
        console.log(form)
        upload(props.galleryId, form, token)
            .then((res) => {
                console.log('success')
                props.fetchImages()
                props.setVisible(false)
            })
    }
    return (
        <Modal
            title="Add Images"
            visible={props.visible}
            footer={null}
            onCancel={() => props.setVisible(false)}
        >
            <>
                <Upload.Dragger {...propsDrag}>
                    <p className="ant-upload-drag-icon">
                        {/* <InboxOutlined /> */}
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Upload.Dragger>
                <br></br>
                <Row justify='center'>
                    <Button
                        onClick={uploadImage}
                    >
                        Upload
                </Button>
                </Row>
            </>
        </Modal>
    )
}
