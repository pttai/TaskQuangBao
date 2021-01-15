import React from 'react';
import './SearchChucVu.scss';
import { Input, Select } from 'antd';

const SearchChucVu = ({ onChange, handleChange }) => {
  return (
    <>
      <Select
        labelInValue
        defaulValue={{ value: 'tenchucvu' }}
        style={{ width: 150, marginLeft: 100, height: 40 }}
        className='ant-select-selector'
        options={[
          {
            id: '1',
            label: 'Tên Chức Vụ',
            value: 'tenchucvu',
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

export default SearchChucVu;
