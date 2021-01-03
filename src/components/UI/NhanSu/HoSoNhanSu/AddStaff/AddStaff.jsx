import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { Button, Modal, Form, Input, Select, DatePicker } from 'antd';

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

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const AddStaff = (props) => {
  // const [values, setValues] = useState([]);
  // const [createStaff, setCreateStaff] = useState([]);
  const { history } = props;

  const onFinish = (values) => {
    console.log(values.user);
    axios({
      method: 'POST',
      url: 'https://quanlyquangbao.herokuapp.com/api/themnhanvien',
      data: values.user,
    }).then((res) => {
      console.log(res.data);
      history.replace('/admin/ho-so-nhan-su');
    });
  };

  return (
    <>
      <Modal
        title='Thêm Nhân Viên'
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
          <Form.Item name={['user', 'ngaybatdau']} label='Ngày Bắt Đầu'>
            <DatePicker
              initialValues={moment('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
            />
          </Form.Item>
          <Form.Item name={['user', 'trangthai']} label='Trạng Thái'>
            <Select>
              <Select.Option value='danghiviec'>Đã nghỉ việc</Select.Option>
              <Select.Option value='danglamviec'>Đang làm việc</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['user', 'tennhanvien']}
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
          <Form.Item name={['user', 'gioitinh']} label='Giới Tính'>
            <Select>
              <Select.Option value='nam'>Nam</Select.Option>
              <Select.Option value='nu'>Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'sodienthoai']} label='Số Điện Thoại'>
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label='Email'
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
              initialValues={moment('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
            />
          </Form.Item>
          <Form.Item
            name={['user', 'quequan']}
            label='Quê Quán'
            rules={[{}]}
            // value={this.state.name}
            // onChange={this.onChange}
          >
            <Input />
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
export default AddStaff;
