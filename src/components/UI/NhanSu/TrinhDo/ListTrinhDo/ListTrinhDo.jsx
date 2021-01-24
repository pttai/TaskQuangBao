import React, { useEffect, useState } from 'react';
import { Table, Button, Breadcrumb, notification } from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { normalizeVNText } from '../../../../../utils/normalizeVNText';
import { Link } from 'react-router-dom';
import AddTrinhDo from '../AddTrinhDo/AddTrinhDo';
import EditTrinhDo from '../EditTrinhDo/EditTrinhDo';
import SearchTrinhDo from '../SearchTrinhDo/SearchTrinhDo';

const ListTrinhDo = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  //   const [detailVisible, setDetailVisible] = useState(false);
  const [trinhdoList, setTrinhDoList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tentrinhdo');
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/trinhdo/danhsachtrinhdo',
    }).then((res) => {
      const { data } = res.data;
      const datas = [];
      for (let i = 0; i < data.length; i++) {
        datas.push({ ...data[i], key: i + 1 });
      }

      setTrinhDoList(datas);
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
    props.history.replace('/admin/trinh-do');
  };

  const showModalEdit = () => {
    setEditVisible(true);
  };

  const handleOkEdit = () => {
    setEditVisible(false);
  };

  const handleCancelEdit = () => {
    setEditVisible(false);
    props.history.replace('/admin/trinh-do');
  };

  //   const showModalDetail = () => {
  //     setDetailVisible(true);
  //   };

  //   const handleOkDetail = () => {
  //     setDetailVisible(false);
  //   };

  //   const handleCancelDetail = () => {
  //     setDetailVisible(false);
  //     props.history.replace('/admin/hop-dong-lao-dong');
  //   };
  const onChange = (e) => {
    if (e.target.value.trim().match(/\\/g)) return;
    const keyword = e.target.value.trim();
    if (!keyword) setTrinhDoList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'tentrinhdo') {
        const newTrinhDoList = data.filter((trinhdo) => {
          if (trinhdo.tentrinhdo) {
            const trinhdoName = normalizeVNText(trinhdo.tentrinhdo);
            return trinhdoName.match(keywordRegEx);
          }
          return false;
        });
        setTrinhDoList(newTrinhDoList);
      }
      // if (key === 'email') {
      //   const newhopdongList = data.filter((user) => {
      //     if (user.email) {
      //       const userName = normalizeVNText(user.email);
      //       return userName.match(keywordRegEx);
      //     }
      //     return false;
      //   });
      //   setTrinhDoList(newUserList);
      // }
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
      title: 'Tên Trình Độ',
      dataIndex: 'tentrinhdo',
      key: 'tentrinhdo',
    },
    {
      title: 'Chuyên Môn',
      dataIndex: 'chuyenmon',
      key: 'chuyenmon',
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'tuychinh',
      key: 'tuychinh',

      render: (_, record, index) => {
        return (
          <div style={{ width: 120 }}>
            {/* <Link
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
            /> */}
            <Link to={`/admin/trinh-do/chinh-sua-trinh-do?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7 }}
                icon={<FormOutlined />}
                onClick={showModalEdit}
              />
            </Link>
            <EditTrinhDo
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
                  url: `https://quanlyquangbao.herokuapp.com/api/trinhdo/xoatrinhdo?id=${record._id}`,
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
        <Breadcrumb.Item>Trình Độ</Breadcrumb.Item>
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
      <Link to='/admin/trinh-do/them-trinh-do'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Trình Độ
        </Button>
      </Link>
      <AddTrinhDo
        {...props}
        visible={isModalVisible}
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        setCreating={setCreating}
      />

      <SearchTrinhDo onChange={onChange} handleChange={handleChange} />
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Table
          columns={columns}
          dataSource={trinhdoList} // receive an array
          style={{ marginTop: 40 }}
          rowKey={(record) => record._id}
        />
      )}
    </div>
  );
};
export default ListTrinhDo;
