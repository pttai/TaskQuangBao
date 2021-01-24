import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './Login.scss';
import { Form, Input, Button, Card, Col, notification } from 'antd';

import { Link } from 'react-router-dom';
import axios from 'axios';

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
  // k co deoendencies => luon luon duoc goi
  //co dependencies nhung ma mang rong => chi duoc goi luc dau va khong goi nua
  // array co chua cac bien phu thuoc => khi bien phu thuoc trong mang dependencies thay doi thi moi thuc thi

  //neu gui request : - true:dang nhap duoc co thong tin gui len client -- flase => tra ve mang rong = client []
  const { history } = props;
  const onFinish = (values) => {
    console.log(values);
    axios({
      method: 'POST',
      url: 'https://quanlyquangbao.herokuapp.com/api/login',
      data: values,
    })
      .then((res) => {
        history.replace('/admin');
      })
      .catch((error) => {
        notification.warning({
          message: 'failed',
          duration: 3,
          message: 'Sai thông tin đăng nhập',
        });
        console.log(error);
      });
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
        <p
          style={{
            fontSize: 30,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 8,
          }}
        >
          ĐĂNG NHẬP
        </p>

        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            className='form_item'
            name='username'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đăng nhập',
              },
            ]}
          >
            <Input placeholder='Tài khoản' />
          </Form.Item>

          <Form.Item
            className='form_item1'
            name='password'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập password',
              },
            ]}
          >
            <Input.Password placeholder='Mật khẩu' />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Col xs={12}>
              <Button
                type='primary'
                htmlType='submit'
                style={{
                  width: 450,
                  height: 40,
                  marginLeft: -150,
                  fontSize: 15,
                }}
              >
                Đăng nhập
              </Button>
            </Col>
            <Col xs={12}>
              <Link to='/quen-mat-khau'>
                <Button
                  type='link'
                  htmlType='button'
                  style={{ paddingTop: 15 }}
                >
                  Quên mật khẩu ?
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
