import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';

import './App.css';

function App() {
  return (
    <div className='page-container'>
      <header className='header'>
        <div className='user-info'>
          <Badge dot
            className='bell-icon'
            size="default"
            offset={[-4,4]}
          >
            <BellOutlined style={{ fontSize: 16 }} />
          </Badge>
          <div className='user-name'>Sarah Green</div>
          <div className='user-avatar'>
            <img src='src/common/avatar.svg'></img>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
