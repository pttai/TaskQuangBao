import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Card, Row, Col } from 'antd';
import "./index.scss";
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
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

// function componentDidMount() {
//   axios.get('http://localhost:5000/api/helloworld')
//   .then(result => this.setState({greeting: result.data.sayHi}))
// }





class Login extends Component {
  constructor(props) {
   super(props);
   this.state = {username: "", password: ""};
   this.history = props;
  }

  onFinish(values) {
    // if (values) {
    //   history.replace('/admin');
    // }
    axios.post('http://localhost:5000/api/login', {
      username: values.username,
      password: values.password
    })
    .then(result => {
      if(result.data.length === 0){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Sai tên đăng nhập hoặc mật khẩu',
          showConfirmButton: false,
          timer: 1500
        })
      } else{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đăng nhập thành công',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout(() => {
          window.location.href = "./admin";
        }, 1500);
      }
      
    });
    // console.log('Success:', values);
  }

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  render() {
    const self = this;
    return (
      <section className="login" >
        <Card className='login__card'>
          <div className="login__logo">
            <img src='/images/iconQuangBao.png' />
          </div>
          <p>LOGIN</p>

          <Form
            {...layout}
            name='basic'
            initialValues={{
              remember: true,
            }}
            onFinish={self.onFinish}
            onFinishFailed={self.onFinishFailed}
          >
            <Form.Item
              label='Username'
              name='username'
              value={self.state.username}
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
              value={self.state.password}
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
                    Create new account !
                  </Button>
                </Link>
              </Col>
            </Form.Item>
          </Form>
        </Card>
      </section>
    );
  }
}


export default Login;
