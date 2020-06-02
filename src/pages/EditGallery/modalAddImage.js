import React from 'react'
import { Modal } from 'antd'

export default function ModalAddImage(props) {
    return (
        <Modal
            title="Add Images"
            visible={props.visible}
            // onOk={this.handleOk}
            onCancel={() => props.setVisible(false)}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}
