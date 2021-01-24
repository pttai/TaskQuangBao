import { Modal, Row, Col, notification, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
const DetailChucVu = (props) => {
  const id = queryString.parse(props.location?.search?.id);
  const [chucvuDetail, setChucVuDetail] = useState({});

  // useEffect(() => {
  //   if (id) {
  //     axios({
  //       method: 'GET',
  //       url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/${id}`,
  //     }).then((res) => {
  //       if (res.data?.data) {
  //         setChucVuDetail(res.data?.data[0]);
  //       }
  //     });
  //   }
  // }, []);

  return (
    <>
      <Modal
        title='Thông tin Chức Vụ'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Tên Chức Vụ:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Giám đốc
                  {chucvuDetail.tenchucvu}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={5}>
                <Typography.Text>Tên Vị Trí:</Typography.Text>
              </Col>
              <Col span={19}>
                <Typography.Paragraph>
                  Giám đốc chi nhánh
                  {chucvuDetail.tenvitri}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DetailChucVu;
