import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Typography, Breadcrumb } from 'antd';

const ThongTin = (props) => {
  const [congty, setCongTy] = useState({});

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://quanlyquangbao.herokuapp.com/api/congty/laythongtincongty',
    }).then((res) => {
      const { data } = res.data;
      setCongTy(data);
    });
  }, []);
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0', fontSize: 20 }}>
        <Breadcrumb.Item>Thông Tin Công Ty</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Tên Doanh Nghiệp:
                </Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Công ty TNHH Quang Bảo
                  {congty.tendoanhnghiep}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Tình Trạng Hoạt Động:
                </Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Đang hoạt động
                  {congty.tinhtranghoatdong}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Loại Hình:
                </Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Doanh nghiệp tư nhân
                  {congty.loaihinhphaply}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Ngày Thành Lập:
                </Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  1986-05-18T16:00:00.000Z
                  {congty.ngaythanhlap}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Địa Chỉ:
                </Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  135 Hóc Môn {congty.diachi}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text style={{ fontWeight: 'bold' }}>
                  Ngành Kinh Doanh:
                </Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Thương mại dịch vụ in ấn
                  {congty.nganhkinhdoanh}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div>
        <img src='/images/Capture.PNG' />
      </div>
    </>
  );
};

export default ThongTin;
