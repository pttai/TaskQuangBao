import React, { Component } from 'react';
import { Table, Button, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import TaskAdd from './TaskAdd';
import TaskSelect from './TaskSelect';
import TaskSearch from './TaskSearch';
const data = [
  {
    key: '1',
    hoten: 'John Brown',
    tuoi: 32,
    diachi: 'New York No. 1 Lake Park',
    loainhanvien: 'Chính thức',
    vitri: 'Giám Đốc',
    sdt: '0123456789',
    thamnien: '8 tháng',
    ngaynghi: '1',
    trangthai: 'Đang làm',
    tuychinh: '',
  },
  {
    key: '2',
    hoten: 'Phan Tấn Tài',
    tuoi: 21,
    diachi: 'Hóc Môn',
    loainhanvien: 'Chính thức',
    vitri: 'Quản Lý',
    sdt: '0123456789',
    thamnien: '5 tháng',
    ngaynghi: '10',
    trangthai: 'Đang làm',
    tuychinh: '',
  },
];
class TaskListStaff extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };
  render() {
    let { tasks } = this.props;
    const columns = [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        // width: '10%',
        // ...this.getColumnSearchProps('key'),
      },
      {
        title: 'Họ Tên',
        dataIndex: 'hoten',
        key: 'hoten',
        // width: '10%',
        // ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Tuổi',
        dataIndex: 'tuoi',
        key: 'tuoi',
        // ...this.getColumnSearchProps('age'),
      },
      {
        title: 'Địa Chỉ',
        dataIndex: 'diachi',
        key: 'diachi',
        // ...this.getColumnSearchProps('address'),
      },
      {
        title: 'Loại Nhân Viên',
        dataIndex: 'loainhanvien',
        key: 'loainhanvien',
        // ...this.getColumnSearchProps('loainhanvien'),
      },
      {
        title: 'Vị Trí',
        dataIndex: 'vitri',
        key: 'vitri',
        // ...this.getColumnSearchProps('vitri'),
      },
      {
        title: 'Điện Thoại',
        dataIndex: 'sdt',
        key: 'sdt',
        // ...this.getColumnSearchProps('sdt'),
      },
      {
        title: 'Thăm Niên',
        dataIndex: 'thamnien',
        key: 'thamnien',
        // ...this.getColumnSearchProps('thamnien'),
      },
      {
        title: 'Ngày Nghỉ',
        dataIndex: 'ngaynghi',
        key: 'ngaynghi',
        // ...this.getColumnSearchProps('ngaynghi'),
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'trangthai',
        key: 'trangthai',
        // ...this.getColumnSearchProps('trangthai'),
      },
      {
        title: 'Tùy Chỉnh',
        dataIndex: 'tuychinh',
        key: 'tuychinh',
        // ...this.getColumnSearchProps('address'),
        render: () => (
          <div style={{ width: 120 }}>
            <Button
              type='primary'
              style={{ borderRadius: 7, marginRight: 5 }}
              icon={<UserOutlined />}
            ></Button>
            <Button
              type='primary'
              style={{ borderRadius: 7, marginRight: 5 }}
              icon={<FormOutlined />}
            ></Button>
            <Button
              type='primary'
              style={{ borderRadius: 7, marginRight: 5 }}
              icon={<DeleteOutlined />}
            ></Button>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0', fontSize: 20 }}>
          <Breadcrumb.Item>Quản Lý Nhân Sự</Breadcrumb.Item>
          <Breadcrumb.Item>Danh Sách Nhân Viên</Breadcrumb.Item>
        </Breadcrumb>
        <TaskAdd />
        <TaskSelect />
        <TaskSearch />
        <Button
          type='primary'
          style={{
            borderRadius: 7,
            marginLeft: 22,
            // height: 48,
          }}
        >
          Xóa
        </Button>
        <Table columns={columns} dataSource={data} style={{ marginTop: 40 }} />
      </div>
    );
  }
}
export default TaskListStaff;
