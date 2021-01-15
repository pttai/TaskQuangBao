import { Modal, Row, Col, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
const DetailCongTy = (props) => {
  const { id } = queryString.parse(props.location.search);
  const [congtyDetail, setCongTyDetail] = useState({});

  useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/${id}`,
      }).then((res) => {
        if (res.data?.data) {
          setCongTyDetail(res.data?.data[0]);
        }
      });
    }
  }, []);

  return (
    <>
      <Modal
        title='Thông tin Công Ty'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Tên Doanh Nghiệp:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Công ty TNHH Quang Bảo
                  {congtyDetail.tendoanhnghiep}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Tình Trạng Hoạt Động:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Đang hoạt động
                  {congtyDetail.tinhtranghoatdong}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Loại Hình:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Doanh nghiệp tư nhân
                  {congtyDetail.loaihinhphaply}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Ngày Thành Lập:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  1986-05-18T16:00:00.000Z
                  {congtyDetail.ngaythanhlap}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Địa Chỉ:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  135 Hóc Môn {congtyDetail.diachi}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Ngành Kinh Doanh:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Thương mại dịch vụ in ấn
                  {congtyDetail.nganhkinhdoanh}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DetailCongTy;
