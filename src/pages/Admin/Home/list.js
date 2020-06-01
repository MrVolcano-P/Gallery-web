import React from 'react';
import { List, Typography, Checkbox } from 'antd'
import { Button } from 'antd';;
export default function ListGallery(props) {
    return (
        <List
            bordered
            dataSource={props.data}
            renderItem={(item) => (
                <List.Item>
                    {item.name}
                    <Button styles={{float:'right'}} onClick={() => { props.delete(item.id) }} type="secondary">DELETE</Button>
                </List.Item>
            )}
        />
    )
}