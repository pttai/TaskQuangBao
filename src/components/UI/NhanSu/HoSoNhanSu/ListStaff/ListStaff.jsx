import React, { useEffect, useState } from 'react';
import ExportJsonExcel from 'js-export-excel';
import { Table, Button, Breadcrumb, notification } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AddStaff from '../AddStaff/AddStaff';
import Search from '../Search/Search';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import EditStaff from '../EditStaff/EditStaff';
import DetailStaff from '../DetailStaff/DetailStaff';
import { Link } from 'react-router-dom';

const ListStaff = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [userDetail, setUserDetail] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tennhanvien');
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien',
    }).then((res) => {
      setStaffList(res.data);
      setData(res.data);
    });
  }, [deleting, creating, editing]);
  console.log(staffList);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.history.replace('/admin/nhan-vien');
  };

  const showModalEdit = () => {
    setEditVisible(true);
  };

  const handleOkEdit = () => {
    setEditVisible(false);
  };

  const handleCancelEdit = () => {
    setEditVisible(false);
    props.history.replace('/admin/nhan-vien');
  };

  const showModalStaffDetail = () => {
    setUserDetail(true);
  };

  const handleOkStaffDetail = () => {
    setUserDetail(false);
  };

  const handleCancelStaffDetail = () => {
    setUserDetail(false);
    props.history.replace('/admin/nhan-vien');
  };

  const downloadExcel = () => {
    let option = {};
    let dataTable = [];
    if (staffList) {
      for (let i in staffList) {
        if (staffList) {
          console.log(staffList[i]);
          let obj = {
            'Employee ID': staffList[i]._id,
            'Employee name': staffList[i].tennhanvien,
          };
          dataTable.push(obj);
        }
      }
    }
    option.fileName = 'Employee Information';
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['Emloyee ID', 'Emloyee Name'],
        sheetHeader: ['Emloyee ID', 'Emloyee Name'],
      },
    ];
    console.log(option);
    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  const onChange = (e, sorter) => {
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
      sorter: (a, b) => a.sdt - b.sdt,
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Quê Quán',
      dataIndex: 'quequan',
      key: 'quequan',
    },
    {
      title: 'Trại Thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
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
            <Link to={`/admin/nhan-vien/thong-tin-nhan-vien?id=${record._id}`}>
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
            <Link to={`/admin/nhan-vien/chinh-sua-nhan-vien?id=${record._id}`}>
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
              visible={editVisible}
              onOk={handleOkEdit}
              onCancel={handleCancelEdit}
              setEditing={setEditing}
            />
            <Button
              type='danger'
              style={{ borderRadius: 7, marginRight: 5, marginLeft: 5 }}
              icon={<DeleteOutlined />}
              onClick={() => {
                setDeleting(true);
                axios({
                  method: 'DELETE',
                  url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/xoanhanvien?id=${record._id}`,
                })
                  .then(() => {
                    notification.success({
                      duration: 4,
                      message: 'XÓA THÀNH CÔNG',
                    });
                    setDeleting(false);
                  })
                  .catch(() => {
                    notification.error({
                      duration: 4,
                      message: 'XÓA THẤT BẠI',
                    });
                    setDeleting(false);
                  });
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
        <Breadcrumb.Item>Nhân Viên</Breadcrumb.Item>
      </Breadcrumb>
      <Button
        onClick={staffList ? downloadExcel : null}
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
      <Link to='/admin/nhan-vien/them-nhan-vien'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Nhân Viên
        </Button>
      </Link>
      <AddStaff
        {...props}
        visible={isModalVisible}
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        setCreating={setCreating}
      />

      <Search onChange={onChange} handleChange={handleChange} />
      <Table
        columns={columns}
        dataSource={staffList} // receive an array
        style={{ marginTop: 40 }}
        rowKey={(record) => record._id}
        onChange={onChange}
      />
    </div>
  );
};
export default ListStaff;
