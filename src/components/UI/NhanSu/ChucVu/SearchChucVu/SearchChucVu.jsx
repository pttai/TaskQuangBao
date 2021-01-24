import React from 'react';
import './SearchChucVu.scss';
import { Input, Select } from 'antd';

const SearchBac = ({ onChange, handleChange }) => {
  return (
    <>
      <Select
        labelInValue
        defaultValue={{ value: 'tenchucvu' }}
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        options={[
          {
            id: '1',
            label: 'Tên Chức Vụ',
            value: 'tenchucvu',
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
export default SearchBac;
