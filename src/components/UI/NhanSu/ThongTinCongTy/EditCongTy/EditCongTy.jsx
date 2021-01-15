import React from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input, Select } from 'antd';
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

const EditCongTy = (props) => {
  const { id } = queryString.parse(props.location.search);
  const { index } = props;
  const onFinish = (values) => {
    console.log(values);
    axios({
      method: 'POST',
      url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/suanhanvien/${id}`,
      data: values[`user_${index}`],
    }).then(() => {
      props.history.replace('/admin/cong-ty');
    });
  };
  return (
    <>
      <Modal
        title='Sửa Công Ty'
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
            name={'tendoanhnghiep'}
            label='Tên Doanh Nghiệp'
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
          <Form.Item name={'tinhtranghoatdong'} label='Tình Trạng Hoạt Động'>
            <Select>
              <Select.Option value='dangung'>Đã ngừng</Select.Option>
              <Select.Option value='danghoatdong'>Đang hoạt động</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={'loaihinhphaply'} label='Loại Hình'>
            <Input />
          </Form.Item>
          <Form.Item
            name={'ngaythanhlap'}
            label='Ngày Thành Lập'
            rules={[{}]}
            // value={this.state.name}
            // onChange={this.onChange}
          >
            <Input />
          </Form.Item>
          <Form.Item name={'loaihinhphaply'} label='Loại Hình'>
            <Input />
          </Form.Item>
          <Form.Item name={'diachi'} label='Địa Chỉ'>
            <Input />
          </Form.Item>
          <Form.Item name={'nganhkinhdoanh'} label='Ngành Kinh Doanh'>
            <Input />
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

export default EditCongTy;
