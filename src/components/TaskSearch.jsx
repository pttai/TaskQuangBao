import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './TaskSearch.scss';
import { Input } from 'antd';

const { Search } = Input;
const onSearch = (value) => console.log(value);

class TaskSearch extends Component {
  render() {
    return (
      <Search
        placeholder='Tìm kiếm'
        onSearch={onSearch}
        enterButton
        className='search-custom'
        style={{ width: 300 }}
      />
    );
  }
}
export default TaskSearch;
