import React from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input, TimePicker } from 'antd';
import queryString from 'query-string';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const EditChamCong = (props) => {
  const id = queryString.parse(props.location?.search?.id);
  const { history } = props;
  const onFinish = (values) => {
    const data = {
      ...values,
    };
    props.setEditing(true);
    axios({
      method: 'PUT',
      url: `https://quanlyquangbao.herokuapp.com/api/chamcong/suamotca/${id}`,
      data,
    }).then((res) => {
      history.replace('/admin/cham-cong');
      props.handleVisible(false);
      props.setEditing(false);
    });
  };
  return (
    <>
      <Modal
        title='Sửa Chấm Công'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={'tenca'}
            label='Tên Ca'
            rules={[
              {
                required: true,
              },
            ]}
            // value={this.state.name}
            // onChange={this.onChange}
          >
            <Input />
          </Form.Item>
          <Form.Item name={'giobatdau'} label='Giờ Bắt Đầu'>
            <TimePicker />
          </Form.Item>
          <Form.Item
            name={'gioketthuc'}
            label='Giờ Kết Thúc'

            // onChange={this.onChange}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item
            name={'batdaunghigiuaca'}
            label='Bắt Đầu Nghỉ Giữa Ca'

            // onChange={this.onChange}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item
            name={'ketthucnghigiuaca'}
            label='Kết Thúc Nghỉ Giữa Ca'

            // onChange={this.onChange}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditChamCong;
