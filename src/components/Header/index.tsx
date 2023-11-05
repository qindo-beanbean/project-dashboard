import React, { useEffect, useState } from 'react'
import { BellOutlined, MenuOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import useDevice from '../../hooks/useDevice';
import classnames from 'classnames';
import './index.css';

export default function Header() {
    const isMobile = useDevice();
    return (
        <header className={classnames('header', { 'isMobile': isMobile })}>
            <div className={classnames('user-info', { 'isMobile': isMobile })}>
                <div style={{ display: isMobile ? 'block' : 'none' }}>
                    <MenuOutlined />
                </div>
                <div className='right-part'>
                    <Badge dot
                        className={classnames('bell-icon', { 'isMobile': isMobile })}
                        size="default"
                        offset={[-4, 4]}
                    >
                        <BellOutlined style={{ fontSize: 16 }} />
                    </Badge>
                    <div
                        className='user-name'
                        style={{ display: isMobile ? 'none' : 'block' }}
                    >
                        Sarah Green
                    </div>
                    <div className='user-avatar'>
                        <img src='/images/avatar.svg' alt="" />
                    </div>
                </div>
            </div>
        </header>
    )
}
