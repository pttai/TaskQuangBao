import { Modal, Row, Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
const DetailDanToc = (props) => {
  const { id } = queryString.parse(props.location.search);
  const [dantocDetail, setDanTocDetail] = useState({});

  useEffect(() => {
    if (id) {
      axios({
        method: 'GET',
        url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/${id}`,
      }).then((res) => {
        if (res.data?.data) {
          setDanTocDetail(res.data?.data[0]);
        }
      });
    }
  }, []);

  return (
    <>
      <Modal
        title='Thông tin Dân Tộc'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Tên Dân Tộc:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Kinh
                  {dantocDetail.tendantoc}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DetailDanToc;
