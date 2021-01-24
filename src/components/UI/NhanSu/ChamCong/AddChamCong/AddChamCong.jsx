import React from 'react';
import axios from 'axios';
import { Button, Form, Input, TimePicker } from 'antd';
import Modal from 'antd/lib/modal/Modal';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const validateMessages = {
  required: '${label} không được để trống!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const AddChamCong = (props) => {
  const { history } = props;

  const onFinish = (values) => {
    props.setCreating(true);
    const data = {
      ...values,
      // ngaysinh: values.ngaysinh.format('YYYY-MM-DD[T00:00:00.000Z]'),
      // ngaybatdau: values.ngaybatdau.format('YYYY-MM-DD[T00:00:00.000Z]'),
    };
    axios({
      method: 'POST',
      url: 'https://quanlyquangbao.herokuapp.com/api/chamcong/themmotca',
      data,
    }).then((res) => {
      console.log(res.data);
      // history.replace('/admin/cham-cong');
      props.handleVisible(false);
      props.setCreating(false);
    });
  };
  return (
    <>
      <Modal
        title='Thêm Chấm Công'
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
          <Form.Item name={'gioketthuc'} label='Giờ Kết Thúc'>
            <TimePicker />
          </Form.Item>
          <Form.Item name={'batdaunghigiuaca'} label='Bắt Đầu Nghỉ Giữa Ca'>
            <TimePicker />
          </Form.Item>
          <Form.Item name={'ketthucnghigiuaca'} label='Kết Thúc Nghỉ Giữa Ca'>
            <TimePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddChamCong;
