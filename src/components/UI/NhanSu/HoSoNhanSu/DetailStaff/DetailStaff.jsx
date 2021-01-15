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
        if (res.data?.success) {
          setUserDetail(res.data.success);
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
                <Typography.Paragraph>{userDetail.sdt}</Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Email:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>{userDetail.email}</Typography.Paragraph>
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
                  {userDetail.quequan}
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
