import React from 'react';
import './SearchHopDong.scss';
import { Input, Select } from 'antd';

const SearchHopDong = ({ onChange, handleChange }) => {
  return (
    <>
      <Select
        labelInValue
        defaulValue={{ value: 'loaihopdong' }}
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        options={[
          {
            id: '1',
            label: 'Loại Hợp Đồng',
            value: 'loaihopdong',
          },
          //   {
          //     id: '2',
          //     label: 'Email',
          //     value: 'email',
          //   },
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

export default SearchHopDong;
