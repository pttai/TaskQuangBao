import React, { useEffect, useState } from 'react';
import { Table, Button, Breadcrumb } from 'antd';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import TaskAdd from '../AddStaff/AddStaff';
import Search from '../Search/Search';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import EditStaff from '../EditStaff/EditStaff';
import { Link } from 'react-router-dom';

const ListStaff = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tennhanvien');

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/danhsachnhanvien',
    }).then((res) => {
      console.log(res);
      setStaffList(res.data);
      // setData(res.data);
    });
  }, []);

  const showModal = () => {
    console.log('click');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    if (e.target.value.trim().match(/\\/g)) return;
    const keyword = e.target.value.trim();
    if (!keyword) setStaffList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'tennhanvien') {
        const newUserList = data.filter((user) => {
          if (user.tennhanvien) {
            const userName = normalizeVNText(user.tennhanvien);
            return userName.match(keywordRegEx);
          }
          return false;
        });
        setStaffList(newUserList);
      }
      if (key === 'email') {
        const newUserList = data.filter((user) => {
          if (user.email) {
            const userName = normalizeVNText(user.email);
            return userName.match(keywordRegEx);
          }
          return false;
        });
        setStaffList(newUserList);
      }
    }
  };
  const handleChange = (value) => {
    setKey(value);
  };
  const columns = [
    {
      title: '#',
      dataIndex: [],
      key: [],
    },
    {
      title: 'Họ Tên',
      dataIndex: 'tennhanvien',
      key: 'tennhanvien',
    },
    {
      title: 'Giới Tính',
      dataIndex: 'gioitinh',
      key: 'gioitinh',
    },
    {
      title: 'Điện Thoại',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'ngaysinh',
      key: 'ngaysinh',
    },
    {
      title: 'Quê Quán',
      dataIndex: 'quequan',
      key: 'quequan',
    },
    {
      title: 'Dân Tộc',
      dataIndex: ['iddantoc', 'tendantoc'],
      key: ['iddantoc', 'tendantoc'],
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'tuychinh',
      key: 'tuychinh',

      render: () => (
        <div style={{ width: 120 }}>
          <Button
            type='primary'
            style={{ borderRadius: 7, marginRight: 5 }}
            icon={<UserOutlined />}
          />
          <EditStaff />
          <Button
            type='primary'
            style={{ borderRadius: 7, marginRight: 5, marginLeft: 5 }}
            icon={<DeleteOutlined />}
          />
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
      <Link to='/admin/ho-so-nhan-su/add-staff'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Nhân Viên
        </Button>
      </Link>
      <TaskAdd
        {...props}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Search onChange={onChange} handleChange={handleChange} />
      <Table
        columns={columns}
        dataSource={staffList}
        style={{ marginTop: 40 }}
      />
    </div>
  );
};
export default ListStaff;
