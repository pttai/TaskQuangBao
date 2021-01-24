import React from 'react';
import './SearchLuongCoBan.scss';
import { Input, Select } from 'antd';

const SearchLuongCoBan = ({ onChange, handleChange }) => {
  return (
    <>
      <Select
        labelInValue
        defaultValue={{ value: 'vung' }}
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        options={[
          {
            id: '1',
            label: 'Vùng',
            value: 'vung',
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
export default SearchLuongCoBan;
