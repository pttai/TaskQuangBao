import React from 'react';
import './SearchTrinhDo.scss';
import { Input, Select } from 'antd';

const SearchBac = ({ onChange, handleChange }) => {
  return (
    <>
      <Select
        labelInValue
        defaultValue={{ value: 'tentrinhdo' }}
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        options={[
          {
            id: '1',
            label: 'Tên Trình Độ',
            value: 'tentrinhdo',
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
