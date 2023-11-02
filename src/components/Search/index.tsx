import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.css'
export default function Search() {
    return (
        <div className='search-container'>
            <Input
                className='input-wrapper'
                placeholder="Search for a keyword"
                prefix={<SearchOutlined />}
            />
        </div>
    )
}
