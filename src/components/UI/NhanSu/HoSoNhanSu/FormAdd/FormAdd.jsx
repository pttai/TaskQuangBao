import React, { Component } from 'react';
import moment from 'moment';

import { Form, Input, InputNumber, Button, Select, DatePicker } from 'antd';
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
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
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
          <Form.Item name={['user', 'ngaysinh']} label='Ngày Sinh'>
            <DatePicker
              defaultValue={moment('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
            />
          </Form.Item>
          <Form.Item name={['user', 'loainhanvien']} label='Loại Nhân Viên'>
            <Select>
              <Select.Option value='chinhthuc'>Chính Thức</Select.Option>
              <Select.Option value='tamthoi'>Tạm Thời</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'vitri']} label='Vị Trí'>
            <Select placeholder='Select one'>
              <Select.Option value='giamdoc'>Giám Đốc</Select.Option>
              <Select.Option value='quanly'>Quản Lý</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'sodienthoai']} label='Số Điện Thoại'>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'thamnien']} label='Thăm Niên'>
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'ngaynghi']}
            label='Ngày Nghỉ'
            rules={[
              {
                type: 'number',
                min: 0,
                max: 30,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['user', 'noidung']} label='Nội Dung'>
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Đồng ý
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
export default FormAdd;
