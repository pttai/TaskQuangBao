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
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const AddDanToc = (props) => {
  const { history } = props;

  const onFinish = () => {
    axios({
      method: 'POST',
      url:
        'https://quanlyquangbao.herokuapp.com/api/nhanvien/danhsachnhanvien/themnhanvien',
    }).then((res) => {
      console.log(res.data);
      history.replace('/admin/dan-toc');
      props.handleVisible(false);
    });
  };
  return (
    <>
      <Modal
        title='Thêm Dân Tộc'
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
            name={'tendantoc'}
            label='Tên Dân Tộc'
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

export default AddDanToc;
