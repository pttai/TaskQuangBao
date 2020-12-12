import React, { Component } from 'react';
import './TaskSearch.scss';
import { Input, Select } from 'antd';

const { Search } = Input;
const { Option, OptGroup } = Select;

const TaskSearch = ({ onSearch, handleChange }) => {
  return (
    <>
      <Select
        defaultValue='Danh Mục'
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        onChange={handleChange}
      >
        <OptGroup label='Loại'>
          <Option value='hoten'>Họ Tên</Option>
          <Option value='diachi'>Địa Chỉ</Option>
        </OptGroup>
        {/* <OptGroup label='Giám Đốc'>
          <Option value='Yiminghe'>yiminghe</Option>
        </OptGroup> */}
      </Select>
      <Search
        placeholder='Tìm kiếm'
        onSearch={onSearch}
        enterButton
        className='search-custom'
        style={{ width: 300 }}
      />
    </>
  );
};
export default TaskSearch;
