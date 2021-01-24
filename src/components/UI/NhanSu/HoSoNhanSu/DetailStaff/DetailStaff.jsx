import { Modal, Row, Col, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
const DetailStaff = (props) => {
  const id = queryString.parse(props.location?.search)?.id;
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios({
        method: 'GET',
        url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/${id}`,
      }).then((res) => {
        if (res.data?.success) {
          setUserDetail(res.data.success);
          setLoading(false);
        }
      });
    }
  }, [id]);
  console.log(userDetail);

  return (
    <>
      <Modal
        title='Thông tin Nhân Viên'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        {loading ? (
          <LoadingOutlined />
        ) : (
          <Row>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Họ và tên:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {userDetail[0]?.tennhanvien}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Giới tính:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {userDetail[0]?.gioitinh}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Số điện thoại:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {userDetail[0]?.sdt}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Email:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {userDetail[0]?.email}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Ngày sinh:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {userDetail[0]?.ngaysinh}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Quê quán:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {userDetail[0]?.quequan}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default DetailStaff;
