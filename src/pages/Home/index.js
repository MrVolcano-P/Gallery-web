import React, { useState, useEffect } from 'react'
import { List } from 'antd/lib/form/Form';
import { Typography } from 'antd';
import ListGallery from '../Admin/Home/list'
import { listGallery } from '../../api/gallery';
export default () => {
    const [gallerys, setGallerys] = useState([])
    const fetchTask = () => {
        listGallery()
            .then(data => {
                console.log(data)
                setGallerys(data.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchTask()
    }, [])
    return (
        <ListGallery
            data={gallerys}
        />
    )
}
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
