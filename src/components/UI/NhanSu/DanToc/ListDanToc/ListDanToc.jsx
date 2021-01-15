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
import EditDanToc from '../EditDanToc/EditDanToc';
import DetailDanToc from '../DetailDanToc/DetailDanToc';
import SearchDanToc from '../SearchDanToc/SearchDanToc';
import AddDanToc from '../AddDanToc/AddDanToc';

const ListDanToc = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [dantocList, setDanTocList] = useState([]);
  const [data, setData] = useState([]);
  const [key, setKey] = useState('tendantoc');

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/dantoc/danhsachdantoc',
    }).then((res) => {
      const { data } = res.data;
      setDanTocList(data);
      setData(data);
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
    props.history.replace('/admin/dan-toc');
  };
  const showModalEdit = () => {
    setEditVisible(true);
  };
  const handleOkEdit = () => {
    setEditVisible(false);
  };
  const handleCancelEdit = () => {
    setEditVisible(false);
    props.history.replace('/admin/dan-toc');
  };
  const showModalDetail = () => {
    setDetailVisible(true);
  };
  const handleOkDetail = () => {
    setDetailVisible(false);
  };
  const handleCancelDetail = () => {
    setDetailVisible(false);
    props.history.replace('/admin/dan-toc');
  };
  const onChange = (e) => {
    if (e.target.value.trim().match(/\\/g)) return;
    const keyword = e.target.value.trim();
    if (!keyword) setDanTocList(data);
    else {
      const normalInput = normalizeVNText(keyword);
      const keywordRegEx = new RegExp(normalInput, 'gi');
      if (key === 'tendantoc') {
        const newDanTocList = data.filter((dantoc) => {
          if (dantoc.tendantoc) {
            const dantocName = normalizeVNText(dantoc.tendantoc);
            return dantocName.match(keywordRegEx);
          }
          return false;
        });
        setDanTocList(newDanTocList);
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
      title: 'Tên Dân Tộc',
      dataIndex: 'tendantoc',
      key: 'tendantoc',
    },
    {
      title: 'Tùy Chỉnh',
      dataIndex: 'tuychinh',
      key: 'tuychinh',

      render: (_, record, index) => {
        return (
          <div style={{ width: 120 }}>
            <Link to={`/admin/dan-toc/thong-tin-dan-toc?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7, marginRight: 5 }}
                icon={<UserOutlined />}
                onClick={showModalDetail}
              />
            </Link>
            <DetailDanToc
              {...props}
              index={index}
              visible={detailVisible}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
            />
            <Link to={`/admin/dan-toc/chinh-sua-dan-toc?id=${record._id}`}>
              <Button
                type='primary'
                style={{ borderRadius: 7 }}
                icon={<FormOutlined />}
                onClick={showModalEdit}
              />
            </Link>
            <EditDanToc
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
        <Breadcrumb.Item>Dân Tộc</Breadcrumb.Item>
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
      <Link to='/admin/dan-toc/them-dan-toc'>
        <Button
          type='primary'
          style={{ borderRadius: 7 }}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        >
          Thêm Dân Tộc
        </Button>
      </Link>
      <AddDanToc
        {...props}
        visible={isModalVisible}
        handleVisible={setIsModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <SearchDanToc onChange={onChange} handleChange={handleChange} />
      <Table
        columns={columns}
        style={{ marginTop: 40 }}
        rowKey={(record) => record._id}
        dataSource={dantocList}
      />
    </div>
  );
};

export default ListDanToc;
