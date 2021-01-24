import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, notification, Table } from 'antd';
import { Link } from 'react-router-dom';

import {
  DeleteOutlined,
  FormOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import AddChamCong from '../AddChamCong/AddChamCong';
import SearchChamCong from '../SearchChamCong/SearchChamCong';
import EditChamCong from '../EditChamCong/EditChamCong';
import DetailChamCong from '../DetailChamCong/DetailChamCong';

const ListChamCong = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [chamcongList, setChamCongList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tenca');
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/chamcong/danhsachca',
    }).then((res) => {
      console.log(res.data.data);
      const { data } = res.data;
      const datas = [];
      for (let i = 0; i < data.length; i++) {
        // data[i].giobatdau = new Intl.DateTimeFormat('default', {
        //   hour: 'numeric',
        //   minute: 'numeric',
        //   second: 'numeric',
        // }).format(data[i].giobatdau);
        datas.push({ ...data[i], key: i + 1 });
      }
      setChamCongList(datas);
      setData(datas);
      setLoading(false);
    });
  }, [deleting, creating, editing]);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // props.history.replace('/admin/cham-cong');
  };
  const showModalEdit = () => {
    setEditVisible(true);
  };
  const handleOkEdit = () => {
    setEditVisible(false);
  };
  const handleCancelEdit = () => {
    setEditVisible(false);
    // props.history.replace('/admin/cham-cong');
  };
  const showModalDetail = () => {
    setDetailVisible(true);
  };
  const handleOkDetail = () => {
    setDetailVisible(false);
  };
  const handleCancelDetail = () => {
    setDetailVisible(false);
    // props.history.replace('/admin/cham-cong');
  };
  const onChange = (e) => {
    if (e.target.value.trim().match(/\\/g)) return;
    const keyword = e.target.value.trim();
    if (!keyword) setChamCongList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'tenca') {
        const newChamCongList = data.filter((chamcong) => {
          if (chamcong.tenca) {
            const chamcongName = normalizeVNText(chamcong.tenca);
            return chamcongName.match(keywordRegEx);
          }
          return false;
        });
        setChamCongList(newChamCongList);
      }
    }
  };
  const handleChange = (value) => {
    setKey(value);
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên Ca',
      dataIndex: 'tenca',
      key: 'tenca',
    },
    {
      title: 'Giờ Bắt Đầu',
      dataIndex: 'giobatdau',
      key: 'giobatdau',
    },
    {
      title: 'Giờ Kết Thúc',
      dataIndex: 'gioketthuc',
      key: 'gioketthuc',
    },
    {
      title: 'Bắt Đầu Nghỉ Giữa Ca',
      dataIndex: 'batdaunghigiuaca',
      key: 'batdaunghigiuaca',
    },
    {
      title: 'Kết Thúc Nghỉ Giữa Ca',
      dataIndex: 'ketthucnghigiuaca',
      key: 'ketthucnghigiuaca',
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'tuychinh',
      key: 'tuychinh',

      render: (_, record, index) => {
        return (
          <div style={{ width: 120 }}>
            <Link to={`/admin/cham-cong/thong-tin-cham-cong?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7, marginRight: 5 }}
                icon={<UserOutlined />}
                onClick={showModalDetail}
              />
            </Link>
            <DetailChamCong
              {...props}
              index={index}
              visible={detailVisible}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
            />
            <Link to={`/admin/cham-cong/chinh-sua-cham-cong?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7 }}
                icon={<FormOutlined />}
                onClick={showModalEdit}
              />
            </Link>
            <EditChamCong
              {...props}
              index={index}
              visible={editVisible}
              handleVisible={setEditVisible}
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
                  url: `https://quanlyquangbao.herokuapp.com/api/chamcong/xoamotca?id=${record._id}`,
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
        <Breadcrumb.Item>Chấm Công</Breadcrumb.Item>
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
      <Link to='/admin/cham-cong/them-cham-cong'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Chấm Công
        </Button>
      </Link>
      <AddChamCong
        {...props}
        visible={isModalVisible}
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        setCreating={setCreating}
      />
      <SearchChamCong onChange={onChange} handleChange={handleChange} />
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Table
          columns={columns}
          style={{ marginTop: 40 }}
          rowKey={(record) => record._id}
          dataSource={chamcongList}
        />
      )}
    </div>
  );
};

export default ListChamCong;
