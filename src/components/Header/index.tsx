import React from 'react'
import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import './index.css'

export default function Header() {
    return (
        <header className='header'>
            <div className='user-info'>
                <Badge dot
                    className='bell-icon'
                    size="default"
                    offset={[-4, 4]}
                >
                    <BellOutlined style={{ fontSize: 16 }} />
                </Badge>
                <div className='user-name'>Sarah Green</div>
                <div className='user-avatar'>
                    <img src='/images/avatar.svg' alt="" />
                </div>
            </div>
        </header>
    )
}
