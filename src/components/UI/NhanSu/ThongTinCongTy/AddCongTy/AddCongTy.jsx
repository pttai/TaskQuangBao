import React from 'react';
import axios from 'axios';
import { Button, Form, Input, Select } from 'antd';
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
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const AddCongTy = (props) => {
  const { history } = props;

  const onFinish = () => {
    axios({
      method: 'POST',
      url:
        'https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/themnhanvien',
    }).then((res) => {
      console.log(res.data);
      history.replace('/admin/cong-ty');
      props.handleVisible(false);
    });
  };
  return (
    <>
      <Modal
        title='Thêm Công Ty'
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
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCongTy;
