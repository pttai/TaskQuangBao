import React from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input } from 'antd';
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

const EditTrinhDo = (props) => {
  const { id } = queryString.parse(props.location.search);
  const { index } = props;
  const onFinish = (values) => {
    console.log(values);
    props.setEditing(true);
    axios({
      method: 'PUT',
      url: `https://quanlyquangbao.herokuapp.com/api/trinhdo/suatrinhdo/${id}`,
      data: values[`user_${index}`],
    }).then(() => {
      props.history.replace('/admin/trinh-do');
    });
  };
  return (
    <>
      <Modal
        title='Sửa Trình Độ'
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
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTrinhDo;
