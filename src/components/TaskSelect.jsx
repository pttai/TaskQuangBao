import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import './TaskSelect.scss';

const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
class TaskSelect extends Component {
  render() {
    return (
      <Select
        defaultValue='Danh Mục'
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        onChange={handleChange}
      >
        <OptGroup label='Loại'>
          <Option value='hoten'>Họ Tên</Option>
          <Option value='tuoi'>Tuổi</Option>
        </OptGroup>
        {/* <OptGroup label='Giám Đốc'>
          <Option value='Yiminghe'>yiminghe</Option>
        </OptGroup> */}
      </Select>
    );
  }
}
export default TaskSelect;
