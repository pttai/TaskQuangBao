import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Button } from 'antd';
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
const onFinish = (values) => {
  console.log(values);
};

class FormAdd extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //     email: '',
  //     age: 3,
  //     website: '',
  //     introduction: '',
  //   };
  // }
  render() {
    return (
      <>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['user', 'name']}
            label='Họ Tên'
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
          <Form.Item
            name={['user', 'diachi']}
            label='Địa Chỉ'
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'tuoi']}
            label='Tuổi'
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['user', 'loainhanvien']} label='Loại Nhân Viên'>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'vitri']} label='Vị Trí'>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'sodienthoai']} label='Số Điện Thoại'>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'thamnien']} label='Thăm Niên'>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'ngaynghi']} label='Ngày Nghỉ'>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'noidung']} label='Nội Dung'>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'vitri']} label='Vị Trí'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
export default FormAdd;
