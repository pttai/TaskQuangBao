import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';
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

const EditStaff = (props) => {
  const { id } = queryString.parse(props.location.search);
  const { index } = props;
  const onFinish = (values) => {
    props.setEditing(true);
    console.log(values);
    axios({
      method: 'POST',
      url: `https://quanlyquangbao.herokuapp.com/api/nhanvien/suanhanvien/${id}`,
      data: values[`user_${index}`],
    }).then(() => {
      props.history.replace('/admin/nhan-vien');
      props.setEditing(false);
    });
  };

  return (
    <>
      <Modal
        title='Sửa Nhân Viên'
        visible={props.visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
        footer={null}
      >
        <Form
          {...layout}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name={[`user-${index}`, 'trangthai']} label='Trạng Thái'>
            <Select>
              <Select.Option value='danghiviec'>Đã nghỉ việc</Select.Option>
              <Select.Option value='danglamviec'>Đang làm việc</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={[`user-${index}`, 'hoten']}
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
          <Form.Item name={[`user-${index}`, 'gioitinh']} label='Giới Tính'>
            <Select>
              <Select.Option value='nam'>Nam</Select.Option>
              <Select.Option value='nu'>Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={[`user-${index}`, 'sodienthoai']}
            label='Số Điện Thoại'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={[`user-${index}`, 'email']}
            label='Email'
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={[`user-${index}`, 'ngaysinh']} label='Ngày Sinh'>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={[`user-${index}`, 'quequan']}
            label='Quê Quán'

            // value={this.state.name}
            // onChange={this.onChange}
          >
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
export default EditStaff;
