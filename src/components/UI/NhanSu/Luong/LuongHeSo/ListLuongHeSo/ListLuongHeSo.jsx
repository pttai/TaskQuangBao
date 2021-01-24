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

const ListLuongHeSo = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [luongList, setLuongList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('vung');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/luong/danhsachhesoluong',
    }).then((res) => {
      const { data } = res.data;
      const datas = [];
      for (let i = 0; i < data.length; i++) {
        datas.push({ ...data[i], key: i + 1 });
      }

      setLuongList(datas);
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
  //   const onChange = (e) => {
  //     if (e.target.value.trim().match(/\\/g)) return;
  //     const keyword = e.target.value.trim();
  //     if (!keyword) setLuongList(data);
  //     else {
  //       const normalInput = normalizeVNText(keyword);
  //       const keywordRegEx = new RegExp(normalInput, 'gi');
  //       if (key === 'vung') {
  //         const newLuongList = data.filter((luong) => {
  //           if (luong.vung) {
  //             const luongName = normalizeVNText(luong.vung);
  //             return luongName.match(keywordRegEx);
  //           }
  //           return false;
  //         });
  //         setLuongList(newLuongList);
  //       }
  //     }
  //   };
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
      title: 'Mức Hệ Số',
      dataIndex: 'mucheso',
      key: 'mucheso',
      sorter: (a, b) => a.mucheso - b.mucheso,
    },
    // {
    //   title: 'Tùy Chỉnh',
    //   dataIndex: 'tuychinh',
    //   key: 'tuychinh',

    //   render: (_, record, index) => {
    //     return (
    //       <div style={{ width: 120 }}>
    //         <Link to={`/admin/cham-cong/thong-tin-cham-cong?id=${record._id}`}>
    //           <Button
    //             type='primary'
    //             style={{ borderRadius: 7, marginRight: 5 }}
    //             icon={<UserOutlined />}
    //             onClick={showModalDetail}
    //           />
    //         </Link>
    //         <DetailChamCong
    //           {...props}
    //           index={index}
    //           visible={detailVisible}
    //           onOk={handleOkDetail}
    //           onCancel={handleCancelDetail}
    //         />
    //         <Link to={`/admin/cham-cong/chinh-sua-cham-cong?id=${record._id}`}>
    //           <Button
    //             type='primary'
    //             style={{ borderRadius: 7 }}
    //             icon={<FormOutlined />}
    //             onClick={showModalEdit}
    //           />
    //         </Link>
    //         <EditChamCong
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
    //               url: `https://quanlyquangbao.herokuapp.com/api/chamcong/xoamotca?id=${record._id}`,
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
        <Breadcrumb.Item>Lương Hệ Số</Breadcrumb.Item>
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
      /> */}
      {/* <SearchLuongCoBan onChange={onChange} handleChange={handleChange} /> */}
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Table
          columns={columns}
          style={{ marginTop: 40 }}
          rowKey={(record) => record._id}
          dataSource={luongList}
        />
      )}
    </div>
  );
};

export default ListLuongHeSo;
