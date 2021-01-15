import React, { useEffect, useState } from 'react';
import { Table, Button, Breadcrumb } from 'antd';
import { FormOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import { Link } from 'react-router-dom';
import DetailCongTy from '../DetailCongTy/DetailCongTy';
import EditCongTy from '../EditCongTy/EditCongTy';

const ListCongTy = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [congtyList, setCongTyList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('loaihopdong');

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/congty/laythongtincongty',
    }).then((res) => {
      const { data } = res.data;
      setCongTyList(data);
      setData(data);
    });
  }, []);
  console.log(congtyList);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.history.replace('/admin/cong-ty');
  };

  const showModalEdit = () => {
    setEditVisible(true);
  };

  const handleOkEdit = () => {
    setEditVisible(false);
  };

  const handleCancelEdit = () => {
    setEditVisible(false);
    props.history.replace('/admin/cong-ty');
  };

  const showModalDetail = () => {
    setDetailVisible(true);
  };

  const handleOkDetail = () => {
    setDetailVisible(false);
  };

  const handleCancelDetail = () => {
    setDetailVisible(false);
    props.history.replace('/admin/cong-ty');
  };
  const onChange = (e) => {
    if (e.target.value.trim().match(/\\/g)) return;
    const keyword = e.target.value.trim();
    if (!keyword) setCongTyList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'tendoanhnghiep') {
        const newCongTyList = data.filter((congty) => {
          if (congty.tendoanhnghiep) {
            const congtyName = normalizeVNText(congty.loaihopdong);
            return congtyName.match(keywordRegEx);
          }
          return false;
        });
        setCongTyList(newCongTyList);
      }
      // if (key === 'email') {
      //   const newcongtyList = data.filter((user) => {
      //     if (user.email) {
      //       const userName = normalizeVNText(user.email);
      //       return userName.match(keywordRegEx);
      //     }
      //     return false;
      //   });
      //   setCongTyList(newUserList);
      // }
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
      title: 'Tên Doanh Nghiệp',
      dataIndex: 'tendoanhnghiep',
      key: 'tendoanhnghiep',
    },
    {
      title: 'Tình Trạng',
      dataIndex: 'tinhtranghoatdong',
      key: 'tinhtranghoatdong',
    },
    {
      title: 'Loại Hình',
      dataIndex: 'loaihinhphaply',
      key: 'loaihinhphaply',
    },
    {
      title: 'Ngày Thành Lập',
      dataIndex: 'ngaythanhlap',
      key: 'ngaythanhlap',
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
    },
    {
      title: 'Ngành Kinh Doanh',
      dataIndex: 'nganhkinhdoanh',
      key: 'nganhkinhdoanh',
    },
    {
      title: 'Tên Nhân Viên ',
      dataIndex: ['idnguoidaidien', 'tennhanvien'],
      key: ['idnguoidaidien', 'tennhanvien'],
    },

    {
      title: 'Tên Chức Vụ',
      dataIndex: ['idnguoidaidien', 'idchucvu', 'tenchucvu'],
      key: ['idnguoidaidien', 'idchucvu', 'tenchucvu'],
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'tuychinh',
      key: 'tuychinh',

      render: (_, record, index) => {
        return (
          <div style={{ width: 120 }}>
            <Link to={`/admin/cong-ty/thong-tin-cong-ty?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7, marginRight: 5 }}
                icon={<UserOutlined />}
                onClick={showModalDetail}
              />
            </Link>
            <DetailCongTy
              {...props}
              index={index}
              visible={detailVisible}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
            />
            <Link to={`/admin/cong-ty/chinh-sua-cong-ty?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7 }}
                icon={<FormOutlined />}
                onClick={showModalEdit}
              />
            </Link>
            <EditCongTy
              {...props}
              index={index}
              visible={editVisible}
              onOk={handleOkEdit}
              onCancel={handleCancelEdit}
            />
            {/* <Button
              type='danger'
              style={{ borderRadius: 7, marginRight: 5, marginLeft: 5 }}
              icon={<DeleteOutlined />}
              onClick={() => {
                axios({
                  method: 'DELETE',
                  url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/xoanhanvien?id=${record._id}`,
                })
                  .then(() =>
                    notification.success({
                      duration: 4,
                      message: 'XÓA THÀNH CÔNG',
                    })
                  )
                  .catch(() =>
                    notification.error({
                      duration: 4,
                      message: 'XÓA THẤT BẠI',
                    })
                  );
              }}
            /> */}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0', fontSize: 20 }}>
        <Breadcrumb.Item>Nhân Sự</Breadcrumb.Item>
        <Breadcrumb.Item>Công Ty</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Button
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
      <Link to='/admin/cong-ty/them-cong-ty'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Công Ty
        </Button>
      </Link>
      <AddCongTy
        {...props}
        visible={isModalVisible}
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      /> */}
      {/* 
      <SearchCongTy onChange={onChange} handleChange={handleChange} /> */}

      <Table
        columns={columns}
        dataSource={congtyList} // receive an array
        style={{ marginTop: 40 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
};
export default ListCongTy;
