import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { AntDesignOutlined } from '@ant-design/icons';
class Avatar extends Component {
  render() {
    return (
      <div>
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 300,
          }}
          icon={<AntDesignOutlined />}
        />
      </div>
    );
  }
}
export default Avatar;
