import React, { useEffect, useState } from 'react';
import { Table, Button, Breadcrumb } from 'antd';
import { DeleteOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import TaskAdd from '../TaskAdd/TaskAdd';
import Search from '../Search/Search';
import FormAdd from '../FormAdd/FormAdd';
import Modal from 'antd/lib/modal/Modal';
const data = [
  {
    key: '1',
    hoten: 'John Brown',
    ngaysinh: 32,
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
    ngaysinh: 21,
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
const normalizeVNText = (text) => {
  text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  text = text.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  text = text.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  text = text.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  text = text.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return text;
};
const ListStaff = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staffList, setStaffList] = useState(data);
  const [key, setKey] = useState('');
  const onSearch = (e) => {
    const keyword = e.target.value.trim();
    if (!keyword.length) setStaffList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'hoten') {
        const newUserList = data.filter((user) => {
          const userName = normalizeVNText(user.hoten);
          return userName.match(keywordRegEx);
        });
        setStaffList(newUserList);
      }
      if (key === 'diachi') {
        const newUserList = data.filter((user) => {
          const userName = normalizeVNText(user.diachi);
          return userName.match(keywordRegEx);
        });
        setStaffList(newUserList);
      }
    }
  };

  const handleChange = (value) => {
    setKey(value);
  };

  //   useEffect(() => {
  //     const keywordRegEx = new RegExp(keyword, 'gi');
  //     if (key === 'hoten') {
  //       const newStaffList = staffList.filter((staff) =>
  //         staff.hoten.match(keywordRegEx)
  //       );
  //       setStaffList(newStaffList);
  //     }
  //     if (key === 'diachi') {
  //       const newStaffList = staffList.filter((staff) =>
  //         staff.diachi.match(keywordRegEx)
  //       );
  //       setStaffList(newStaffList);
  //     }

  //     if (keyword.trim().length === 0) setStaffList(data);
  //   }, [keyword]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
      title: 'Ngày Sinh',
      dataIndex: 'ngaysinh',
      key: 'ngaysinh',
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
          <>
            <Button
              type='primary'
              style={{ borderRadius: 7, marginRight: 5 }}
              icon={<FormOutlined />}
              onClick={showModal}
            ></Button>
            <Modal
              title='Sửa Nhân Viên'
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <FormAdd />
            </Modal>
          </>
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
        <Breadcrumb.Item>Nhân Sự</Breadcrumb.Item>
        <Breadcrumb.Item>Hồ Sơ Nhân Sự</Breadcrumb.Item>
      </Breadcrumb>
      <Button
        tyle='primary'
        style={{
          borderRadius: 7,
          marginRight: 5,
          color: 'white',
          backgroundColor: '#54e346',
        }}
      >
        Xuất File
      </Button>
      <TaskAdd />
      <Search onChange={onSearch} handleChange={handleChange} />
      <Table
        columns={columns}
        dataSource={staffList}
        style={{ marginTop: 40 }}
      />
    </div>
  );
};
export default ListStaff;
