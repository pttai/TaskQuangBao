import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './Login.scss';
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
const adminUser = {
  username: 'phantantai',
  password: 'admin123',
};

const Login = (props) => {
  const { history } = props;
  const onFinish = (values) => {
    if (
      values.username == adminUser.username &&
      values.password == adminUser.password
    ) {
      history.replace('/admin');
      console.log('Success:', values);
    } else {
      onFinishFailed('');
    }
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
          style={{ marginRight: 40 }}
        >
          <Form.Item
            className='form_item'
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
            className='form_item'
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
              <Button type='primary' htmlType='submit' style={{ width: 180 }}>
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
