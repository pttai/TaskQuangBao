import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
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

const AddTrinhDo = (props) => {
  const { history } = props;

  const onFinish = (values) => {
    props.setCreating(true);
    const data = {
      ...values,
      ngaysinh: values.ngaysinh.format('YYYY-MM-DD[T00:00:00.000Z]'),
      ngaybatdau: values.ngaybatdau.format('YYYY-MM-DD[T00:00:00.000Z]'),
    };
    axios({
      method: 'POST',
      url:
        'https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/themnhanvien',
      data: data,
    }).then((res) => {
      history.replace('/admin/trinh-do');
      props.handleVisible(false);
      props.setCreating(false);
    });
  };
  return (
    <>
      <Modal
        title='Thêm Trình Độ'
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
            name={'tentrinhdo'}
            label='Tên Trình Độ'
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
          <Form.Item name={'chuyenmon'} label='Chuyên Môn'>
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

export default AddTrinhDo;
