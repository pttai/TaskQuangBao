import React, { useEffect, useState } from 'react';
import { Table, Button, Breadcrumb, notification } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import TaskAdd from '../AddStaff/AddStaff';
import Search from '../Search/Search';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import EditStaff from '../EditStaff/EditStaff';
import DetailStaff from '../DetailStaff/DetailStaff';
import { Link } from 'react-router-dom';

const ListStaff = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [EditVisible, setEditVisible] = useState(false);
  const [userDetail, setUserDetail] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tennhanvien');

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/danhsachnhanvien',
    }).then((res) => {
      const { data } = res.data;
      setStaffList(data);
      setData(data);
    });
  }, []);
  console.log(staffList);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.history.replace('/admin/ho-so-nhan-su');
  };

  const showModalEdit = () => {
    setEditVisible(true);
  };

  const handleOkEdit = () => {
    setEditVisible(false);
  };

  const handleCancelEdit = () => {
    setEditVisible(false);
    props.history.replace('/admin/ho-so-nhan-su');
  };

  const showModalStaffDetail = () => {
    setUserDetail(true);
  };

  const handleOkStaffDetail = () => {
    setUserDetail(false);
  };

  const handleCancelStaffDetail = () => {
    setUserDetail(false);
    props.history.replace('/admin/ho-so-nhan-su');
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

      render: (_, record, index) => {
        return (
          <div style={{ width: 120 }}>
            <Link to={`/admin/ho-so-nhan-su/detail-staff?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7, marginRight: 5 }}
                icon={<UserOutlined />}
                onClick={showModalStaffDetail}
              />
            </Link>
            <DetailStaff
              {...props}
              index={index}
              visible={userDetail}
              onOk={handleOkStaffDetail}
              onCancel={handleCancelStaffDetail}
            />
            <Link to={`/admin/ho-so-nhan-su/edit-staff?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7 }}
                icon={<FormOutlined />}
                onClick={showModalEdit}
              />
            </Link>
            <EditStaff
              {...props}
              index={index}
              visible={EditVisible}
              onOk={handleOkEdit}
              onCancel={handleCancelEdit}
            />
            <Button
              type='danger'
              style={{ borderRadius: 7, marginRight: 5, marginLeft: 5 }}
              icon={<DeleteOutlined />}
              onClick={() => {
                axios({
                  method: 'DELETE',
                  url: `https://quanlyquangbao.herokuapp.com/api/xoanhanvien?id=${record._id}`,
                })
                  .then(() =>
                    notification.success({
                      duration: 4,
                      message: 'DELETE SUCCEEDED',
                    })
                  )
                  .catch(() =>
                    notification.error({
                      duration: 4,
                      message: 'DELETE FAILED',
                    })
                  );
              }}
            />
          </div>
        );
      },
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
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Search onChange={onChange} handleChange={handleChange} />
      <Table
        columns={columns}
        dataSource={staffList} // receive an array
        style={{ marginTop: 40 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
};
export default ListStaff;
