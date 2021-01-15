import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, notification, Table } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined,
  FormOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import SearchChucVu from '../SearchChucVu/SearchChucVu';
import AddChucVu from '../AddChucVu/AddChucVu';
import EditChucVu from '../EditChucVu/EditChucVu';
import DetailChucVu from '../DetailChucVu/DetailChucVu';

const ListChucVu = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [chucvuList, setChucVuList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tenchucvu');

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/chucvu/danhsachchucvu',
    }).then((res) => {
      const { data } = res.data;
      setChucVuList(data);
      setData(data);
    });
  }, []);
  console.log(chucvuList);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    props.history.replace('/admin/chuc-vu');
  };
  const showModalEdit = () => {
    setEditVisible(true);
  };
  const handleOkEdit = () => {
    setEditVisible(false);
  };
  const handleCancelEdit = () => {
    setEditVisible(false);
    props.history.replace('/admin/chuc-vu');
  };
  const showModalDetail = () => {
    setDetailVisible(true);
  };
  const handleOkDetail = () => {
    setDetailVisible(false);
  };
  const handleCancelDetail = () => {
    setDetailVisible(false);
    props.history.replace('/admin/chuc-vu');
  };
  const onChange = (e) => {
    if (e.target.value.trim().match(/\\/g)) return;
    const keyword = e.target.value.trim();
    if (!keyword) setChucVuList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'tenchucvu') {
        const newChucVuList = data.filter((chucvu) => {
          if (chucvu.tenchucvu) {
            const chucvuName = normalizeVNText(chucvu.tenchucvu);
            return chucvuName.match(keywordRegEx);
          }
          return false;
        });
        setChucVuList(newChucVuList);
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
      title: 'Tên Chức Vụ',
      dataIndex: 'tenchucvu',
      key: 'tenchucvu',
    },
    {
      title: 'Tên Vị Trí',
      dataIndex: 'tenvitri',
      key: 'tenvitri',
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'tuychinh',
      key: 'tuychinh',

      render: (_, record, index) => {
        return (
          <div style={{ width: 120 }}>
            <Link to={`/admin/chuc-vu/thong-tin-chuc-vu?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7, marginRight: 5 }}
                icon={<UserOutlined />}
                onClick={showModalDetail}
              />
            </Link>
            <DetailChucVu
              {...props}
              index={index}
              visible={detailVisible}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
            />
            <Link to={`/admin/chuc-vu/chinh-sua-chuc-vu?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7 }}
                icon={<FormOutlined />}
                onClick={showModalEdit}
              />
            </Link>
            <EditChucVu
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
        <Breadcrumb.Item>Chức Vụ</Breadcrumb.Item>
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
      <Link to='/admin/chuc-vu/them-chuc-vu'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Chức Vụ
        </Button>
      </Link>
      <AddChucVu
        {...props}
        visible={isModalVisible}
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <SearchChucVu onChange={onChange} handleChange={handleChange} />
      <Table
        columns={columns}
        style={{ marginTop: 40 }}
        rowKey={(record) => record._id}
        dataSource={chucvuList}
      />
    </div>
  );
};

export default ListChucVu;
