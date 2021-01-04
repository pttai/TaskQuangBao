import React from 'react';
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

  const onFinish = (values) => {
    // format date again
    const data = {
      ...values,
      ngaysinh: values.ngaysinh.format('DD-MM-YYYY'),
      // ngaybatdau: values.ngaybatdau.format('DD-MM-YY'),
    };
    console.log(data);
    axios({
      method: 'POST',
      url: 'https://quanlyquangbao.herokuapp.com/api/danhsachnhanvien/themnhanvien',
      data,
    }).then((res) => {
      console.log(res.data);
      history.replace('/admin/ho-so-nhan-su');
      props.handleVisible(false);
    });
  };

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
        {/* Trường này tự fill theo ngày hiện tại
          <Form.Item name={'ngaybatdau'} label='Ngày Bắt Đầu'>
            <DatePicker />
          </Form.Item>
        */}

        
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
          <Form.Item name={'idchucvu'} label='Chức Vụ'>
            <Select>
              <Select.Option value='5ff2895e89a45d0b189d8827'>Nhân Viên Vận Chuyển</Select.Option>
              <Select.Option value='5ff2895e89a45d0b189d8826'>Nhân Viên Kho</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={'iddantoc'} label='Dân tộc'>
            <Select>
              <Select.Option value='5fdcfd25f091941ebcf0cd78'>Kinh</Select.Option>
              <Select.Option value='5fdcfd25f091941ebcf0cd7d'>Mường</Select.Option>
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
            name={'diachi'}
            label='Địa chỉ'
            rules={[{}]}
            // value={this.state.name}
            // onChange={this.onChange}
          >
          <Input />
          </Form.Item>
          
          <Form.Item
            name={'quequan'}
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
export default AddStaff;
