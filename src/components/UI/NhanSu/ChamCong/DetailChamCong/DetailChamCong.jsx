import { Modal, Row, Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
const DetailChamCong = (props) => {
  const id = queryString.parse(props.location?.search)?.id;
  const [loading, setLoading] = useState(false);
  const [chamcongDetail, setChamCongDetail] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios({
        method: 'GET',
        url: `https://quanlyquangbao.herokuapp.com/api/chamcong/laymotca/${id}`,
      }).then((res) => {
        console.log(res.data);
        if (res.data?.data) {
          setChamCongDetail(res.data.data);
          setLoading(false);
        }
      });
    }
  }, [id]);

  return (
    <>
      <Modal
        title='Thông tin Ca'
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
                  <Typography.Text>Tên Ca:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {chamcongDetail[0]?.tenca}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Giờ Bắt Đầu:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {chamcongDetail[0]?.giobatdau}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Giờ Kết Thúc:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {chamcongDetail[0]?.gioketthuc}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Bắt Đầu Nghỉ Giữa Ca:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {chamcongDetail[0]?.batdaunghigiuaca}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5}>
                  <Typography.Text>Kết Thúc Nghỉ Giữa Ca:</Typography.Text>
                </Col>
                <Col span={19}>
                  <Typography.Paragraph>
                    {chamcongDetail[0]?.ketthucnghigiuaca}
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

export default DetailChamCong;
