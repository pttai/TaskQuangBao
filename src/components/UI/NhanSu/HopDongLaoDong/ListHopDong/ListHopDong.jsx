import React, { useEffect, useState } from 'react';
import { Table, Button, Breadcrumb, notification } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import { Link } from 'react-router-dom';
import SearchHopDong from '../SearchHopDong/SearchHopDong';
import AddHopDong from '../AddHopDong/AddHopDong';
import DetailHopDong from '../DetailHopDong/DetailHopDong';
import EditHopDong from '../EditHopDong/EditHopDong';

const ListHopDong = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [hopdongList, setHopDongList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('loaihopdong');

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/hopdong/danhsachhopdong',
    }).then((res) => {
      const { data } = res.data;
      setHopDongList(data);
      setData(data);
    });
  }, []);
  console.log(hopdongList);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.history.replace('/admin/hop-dong-lao-dong');
  };

  const showModalEdit = () => {
    setEditVisible(true);
  };

  const handleOkEdit = () => {
    setEditVisible(false);
  };

  const handleCancelEdit = () => {
    setEditVisible(false);
    props.history.replace('/admin/hop-dong-lao-dong');
  };

  const showModalDetail = () => {
    setDetailVisible(true);
  };

  const handleOkDetail = () => {
    setDetailVisible(false);
  };

  const handleCancelDetail = () => {
    setDetailVisible(false);
    props.history.replace('/admin/hop-dong-lao-dong');
  };
  const onChange = (e) => {
    if (e.target.value.trim().match(/\\/g)) return;
    const keyword = e.target.value.trim();
    if (!keyword) setHopDongList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'loaihopdong') {
        const newHopDongList = data.filter((hopdong) => {
          if (hopdong.loaihopdong) {
            const hopdongName = normalizeVNText(hopdong.loaihopdong);
            return hopdongName.match(keywordRegEx);
          }
          return false;
        });
        setHopDongList(newHopDongList);
      }
      // if (key === 'email') {
      //   const newhopdongList = data.filter((user) => {
      //     if (user.email) {
      //       const userName = normalizeVNText(user.email);
      //       return userName.match(keywordRegEx);
      //     }
      //     return false;
      //   });
      //   setHopDongList(newUserList);
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
      title: 'Loại Hợp Đồng',
      dataIndex: 'loaihopdong',
      key: 'loaihopdong',
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'ngaybatdau',
      key: 'ngaybatdau',
    },
    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'ngayketthuc',
      key: 'ngayketthuc',
    },
    {
      title: 'Nội Dung Hợp Đồng',
      dataIndex: 'noidung',
      key: 'noidung',
    },
    {
      title: 'Tên Nhân Viên ',
      dataIndex: ['idnhanvien', 'tennhanvien'],
      key: ['idnhanvien', 'tennhanvien'],
    },

    {
      title: 'Tên Doanh Nghiệp',
      dataIndex: ['idcongty', 'tendoanhnghiep'],
      key: ['idcongty', 'tendoanhnghiep'],
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'tuychinh',
      key: 'tuychinh',

      render: (_, record, index) => {
        return (
          <div style={{ width: 120 }}>
            <Link
              to={`/admin/hop-dong-lao-dong/thong-tin-hop-dong?id=${record._id}`}
            >
              <Button
                type='primary'
                style={{ borderRadius: 7, marginRight: 5 }}
                icon={<UserOutlined />}
                onClick={showModalDetail}
              />
            </Link>
            <DetailHopDong
              {...props}
              index={index}
              visible={detailVisible}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
            />
            <Link
              to={`/admin/hop-dong-lao-dong/chinh-sua-hop-dong?id=${record._id}`}
            >
              <Button
                type='primary'
                style={{ borderRadius: 7 }}
                icon={<FormOutlined />}
                onClick={showModalEdit}
              />
            </Link>
            <EditHopDong
              {...props}
              index={index}
              visible={editVisible}
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
        <Breadcrumb.Item>Hợp Đồng Lao Động</Breadcrumb.Item>
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
      <Link to='/admin/hop-dong-lao-dong/them-hop-dong'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Hợp Đồng
        </Button>
      </Link>
      <AddHopDong
        {...props}
        visible={isModalVisible}
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <SearchHopDong onChange={onChange} handleChange={handleChange} />

      <Table
        columns={columns}
        dataSource={hopdongList} // receive an array
        style={{ marginTop: 40 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
};
export default ListHopDong;
