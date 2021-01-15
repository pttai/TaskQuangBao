import { Modal, Row, Col, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
const DetailStaff = (props) => {
  const { id } = queryString.parse(props.location.search);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/${id}`,
      }).then((res) => {
        if (res.data?.data) {
          setUserDetail(res.data?.data[0]);
        }
      });
    }
  }, []);

  return (
    <>
      <Modal
        title='Thông tin Nhân Viên'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Họ và tên:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Nguyễn Thị Bích
                  {userDetail.tennhanvien}
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
                  Nữ
                  {userDetail.gioitinh}
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
                  {' '}
                  0932423123{userDetail.sdt}
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
                  bichnguyen@gmail.com
                  {userDetail.email}
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
                  1986-05-18T16:00:00.000Z
                  {userDetail.ngaysinh}
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
                  Bến Tre
                  {userDetail.quequan}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Dân Tộc:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Kinh
                  {userDetail.dantoc}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>

          {/* <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Trạng thái:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  {userDetail.idnhanvienchinhthuc?.trangthai}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col> */}
        </Row>
      </Modal>
    </>
  );
};

export default DetailStaff;
