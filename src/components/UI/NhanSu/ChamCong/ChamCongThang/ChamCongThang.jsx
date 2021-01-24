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

const ChamCongThang = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [chamcongList, setChamCongList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tenchucvu');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url:
        'https://quanlyquangbao.herokuapp.com/api/chamcong/ketquatheothang/1',
    }).then((res) => {
      const { data } = res.data;
      const datas = [];
      for (let i = 0; i < data.length; i++) {
        datas.push({ ...data[i], key: i + 1 });
      }
      setChamCongList(datas);
      setData(datas);
      setLoading(false);
    });
  }, []);
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
      title: 'Tổng Thời Gian',
      dataIndex: 'tongthoigian',
      key: 'tongthoigian',
      sorter: (a, b) => a.tongthoigian - b.tongthoigian,
    },
    {
      title: 'Tên Nhân Viên',
      dataIndex: 'tennhanvien',
      key: 'tennhanvien',
    },
    // {
    //   title: 'Tùy Chỉnh',
    //   dataIndex: 'tuychinh',
    //   key: 'tuychinh',

    //   render: (_, record, index) => {
    //     return (
    //       <div style={{ width: 120 }}>
    //         <Link to={`/admin/chuc-vu/thong-tin-chuc-vu?id=${record._id}`}>
    //           <Button
    //             type='primary'
    //             style={{ borderRadius: 7, marginRight: 5 }}
    //             icon={<UserOutlined />}
    //             onClick={showModalDetail}
    //           />
    //         </Link>
    //         <DetailChucVu
    //           {...props}
    //           index={index}
    //           visible={detailVisible}
    //           onOk={handleOkDetail}
    //           onCancel={handleCancelDetail}
    //         />
    //         <Link to={`/admin/chuc-vu/chinh-sua-chuc-vu?id=${record._id}`}>
    //           <Button
    //             type='primary'
    //             style={{ borderRadius: 7 }}
    //             icon={<FormOutlined />}
    //             onClick={showModalEdit}
    //           />
    //         </Link>
    //         <EditChucVu
    //           {...props}
    //           index={index}
    //           visible={editVisible}
    //           onOk={handleOkEdit}
    //           onCancel={handleCancelEdit}
    //         />
    //         <Button
    //           type='danger'
    //           style={{ borderRadius: 7, marginRight: 5, marginLeft: 5 }}
    //           icon={<DeleteOutlined />}
    //           onClick={() => {
    //             axios({
    //               method: 'DELETE',
    //               url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/xoanhanvien?id=${record._id}`,
    //             })
    //               .then(() =>
    //                 notification.success({
    //                   duration: 4,
    //                   message: 'XÓA THÀNH CÔNG',
    //                 })
    //               )
    //               .catch(() =>
    //                 notification.error({
    //                   duration: 4,
    //                   message: 'XÓA THẤT BẠI',
    //                 })
    //               );
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0', fontSize: 20 }}>
        <Breadcrumb.Item>Nhân Sự</Breadcrumb.Item>
        <Breadcrumb.Item>Chấm Công Theo Tháng</Breadcrumb.Item>
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
      /> */}
      {/* <SearchChucVu onChange={onChange} handleChange={handleChange} /> */}
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

export default ChamCongThang;
