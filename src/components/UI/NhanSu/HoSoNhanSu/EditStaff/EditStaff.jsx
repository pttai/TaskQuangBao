import React, { useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
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

const EditStaff = (props) => {
  const { history } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = (values) => {
    console.log(values);
    axios({
      method: 'POST',
      url: 'https://quanlyquangbao.herokuapp.com/api/themnhanvien',
      data: values,
    }).then((res) => {
      history.replace('/admin/ho-so-nhan-su');
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button
        type='primary'
        style={{ borderRadius: 7 }}
        icon={<FormOutlined />}
        onClick={showModal}
      ></Button>
      <Modal
        title='Sửa Nhân Viên'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name={['user', 'trangthai']} label='Trạng Thái'>
            <Select>
              <Select.Option value='danghiviec'>Đã nghỉ việc</Select.Option>
              <Select.Option value='danglamviec'>Đang làm việc</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={['user', 'hoten']}
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
              defaultValue={moment('01/01/2015', dateFormatList[0])}
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
export default EditStaff;
