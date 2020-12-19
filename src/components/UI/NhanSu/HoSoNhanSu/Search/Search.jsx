import React, { Component } from 'react';
import './Search.scss';
import { Input, Select } from 'antd';

const { Option, OptGroup } = Select;

const Search = ({ onChange, handleChange }) => {
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
      <Input
        placeholder='Tìm kiếm'
        onChange={onChange}
        enterButton
        className='search-custom'
        style={{ width: 300 }}
      />
    </>
  );
};
export default Search;
