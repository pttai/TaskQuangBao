import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Card, Row, Col } from 'antd';

import { Link } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = (props) => {
  const { history } = props;
  const onFinish = (values) => {
    if (values) {
      history.replace('/admin');
    }
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        className='Login'
        style={{
          width: 500,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src='/images/iconQuangBao.png' />
        </div>
        <p style={{ fontSize: 30, textAlign: 'center' }}> LOGIN</p>

        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Row>
              <Col xs={11}>
                <Checkbox style={{ padding: '4px 0px' }}>Remember me</Checkbox>
              </Col>
              <Col xs={13}>
                <Button type='link' htmlType='button'>
                  Forgot your password ?
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Col xs={12}>
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
            </Col>
            <Col xs={12}>
              <Link to='/create-new-account'>
                <Button
                  type='link'
                  htmlType='button'
                  style={{ padding: '12px 0px' }}
                >
                  Craete new account !
                </Button>
              </Link>
            </Col>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
