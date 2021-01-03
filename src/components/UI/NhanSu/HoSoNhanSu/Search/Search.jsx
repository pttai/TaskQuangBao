import React, { Component } from 'react';
import './Search.scss';
import { Input, Select } from 'antd';

const { Option, OptGroup } = Select;

const Search = ({ onChange, handleChange }) => {
  return (
    <>
      <Select
        labelInValue
        defaultValue={{ value: 'tennhanvien' }}
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        options={[
          {
            id: '1',
            label: 'Họ Tên',
            value: 'tennhanvien',
          },
          {
            id: '2',
            label: 'Email',
            value: 'email',
          },
        ]}
        onChange={handleChange}
      ></Select>
      <Input
        placeholder='Tìm kiếm'
        onChange={onChange}
        className='search-custom'
        style={{ width: 300 }}
      />
    </>
  );
};
export default Search;
