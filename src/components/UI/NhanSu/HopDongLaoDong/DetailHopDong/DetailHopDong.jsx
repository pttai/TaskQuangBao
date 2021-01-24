import { Modal, Row, Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
const DetailHopDong = (props) => {
  const { id } = queryString.parse(props.location.search);
  const [hopdongDetail, setHopDongDetail] = useState({});

  useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/${id}`,
      }).then((res) => {
        if (res.data?.data) {
          setHopDongDetail(res.data?.data[0]);
        }
      });
    }
  }, []);

  return (
    <>
      <Modal
        title='Thông tin Hợp Đồng'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Loại Hợp Đồng:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Hợp đồng xác định thời hạn
                  {hopdongDetail.loaihopdong}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Ngày Bắt Đầu:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  1986-05-18T16:00:00.000Z
                  {hopdongDetail.ngaybatdau}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Ngày Kết Thúc:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  1986-05-18T16:00:00.000Z
                  {hopdongDetail.ngayketthuc}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Nội Dung:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Nội dung hợp động
                  {hopdongDetail.noidung}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Tên Nhân Viên:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Nguyễn Thị Bích
                  {hopdongDetail.tennhanvien}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Tên Doanh Nghiệp:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Công ty TNHH Quang Bảo
                  {hopdongDetail.tendoanhnghiep}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DetailHopDong;
