import React, { useEffect, useState } from 'react';
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

const AddStaff = (props) => {
  // const [values, setValues] = useState([]);
  // const [createStaff, setCreateStaff] = useState([]);
  const { history } = props;
  const [Ethnicity, setEthnicity] = useState([]);
  const onFinish = (values) => {
    // format date again
    props.setCreating(true);
    const data = {
      ...values,
      ngaysinh: values.ngaysinh.format('YYYY-MM-DD[T00:00:00.000Z]'),
      ngaybatdau: values.ngaybatdau.format('YYYY-MM-DD[T00:00:00.000Z]'),
    };

    axios({
      method: 'POST',
      url: 'http://quanlyquangbao.herokuapp.com/api/nhanvien/themnhanvien',
      data,
    }).then((res) => {
      history.replace('/admin/nhan-vien');
      props.handleVisible(false);
      props.setCreating(false);
    });
  };
  useEffect(() => {
    axios
      .get('https://quanlyquangbao.herokuapp.com/api/dantoc/danhsachdantoc')
      .then((res) => setEthnicity(res.data.data));
  }, []);

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
          <Form.Item name={'ngaybatdau'} label='Ngày Bắt Đầu'>
            <DatePicker />
          </Form.Item>
          <Form.Item name={'trangthai'} label='Trạng Thái'>
            <Select>
              <Select.Option value='danghiviec'>Đã nghỉ việc</Select.Option>
              <Select.Option value='danglamviec'>Đang làm việc</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={'tennhanvien'}
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
          <Form.Item name={'gioitinh'} label='Giới Tính'>
            <Select>
              <Select.Option value='nam'>Nam</Select.Option>
              <Select.Option value='nu'>Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={'iddantoc'} label='Dân tộc'>
            <Select>
              {Ethnicity.map((dantoc) => {
                return (
                  <Select.Option key={dantoc._id} value={dantoc._id}>
                    {dantoc.tendantoc}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name={'sdt'} label='Số Điện Thoại'>
            <Input />
          </Form.Item>
          <Form.Item
            name={'email'}
            label='Email'
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'ngaysinh'}
            label='Ngày Sinh'
            rules={[{ type: 'object' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={'quequan'}
            label='Quê Quán'
            rules={[{ required: true }]}
            // value={this.state.name}
            // onChange={this.onChange}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'diachi'}
            label='Địa chỉ'
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
