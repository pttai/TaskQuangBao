import React from 'react';
import 'antd/dist/antd.css';
import './SiderMenu.scss';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

const SiderMenu = (props) => {
  return (
    <Menu
      theme='dark'
      defaultSelectedKeys={['20']}
      mode='inline'
      className='Sider-menu'
    >
      <Menu.Item
        key='20'
        style={{
          fontSize: 30,
          // color: 'white',
          fontWeight: 'bold',
          marginBottom: 10,
          height: 60,
          paddingTop: 10,
        }}
      >
        <Link to='/admin'>
          <img
            src='/images/iconQuangBao.png'
            style={{ width: 40, marginRight: 25, marginLeft: -8 }}
          />
          QUANGBAO
        </Link>
      </Menu.Item>
      <SubMenu
        key='sub1'
        icon={<PieChartOutlined />}
        title='Quản Lý Nhân Sự'
        defaultSelectedKeys={[]}
      >
        <Menu.Item key='1'>
          <Link to='/admin/danh-sach-nhan-vien'>Danh Sách Nhân Viên</Link>
        </Menu.Item>
        <Menu.Item key='2'> Năng Lực Nhân Viên</Menu.Item>
        <Menu.Item key='3'>Hồ Sơ Nhân Viên</Menu.Item>
        <Menu.Item key='4'> Nhật Ký Làm Việc</Menu.Item>
        <Menu.Item key='5'> Lương</Menu.Item>
        <Menu.Item key='6'>Tuyển Dụng</Menu.Item>
      </SubMenu>
      <SubMenu key='sub2' icon={<DesktopOutlined />} title='Quản Lý Sản Xuất'>
        <Menu.Item key='7'>Mặt Hàng</Menu.Item>
        <Menu.Item key='8'>Đối Tác,Khách Hàng</Menu.Item>
        <Menu.Item key='9'>Nhà Cung Cấp</Menu.Item>
        <Menu.Item key='10'>Thiết Bị</Menu.Item>
        <Menu.Item key='11'>Sản Phẩm Lỗi</Menu.Item>
        <Menu.Item key='12'>Thanh Toán,Công Nợ</Menu.Item>
        <Menu.Item key='13'>Kho</Menu.Item>
      </SubMenu>
      <SubMenu key='sub3' icon={<UserOutlined />} title='User'>
        <Menu.Item key='14'>Tom</Menu.Item>
        <Menu.Item key='15'>Bill</Menu.Item>
        <Menu.Item key='16'>Alex</Menu.Item>
      </SubMenu>
      <SubMenu key='sub4' icon={<TeamOutlined />} title='Team'>
        <Menu.Item key='17'>Team 1</Menu.Item>
        <Menu.Item key='18'>Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key='19' icon={<FileOutlined />}>
        Files
      </Menu.Item>
    </Menu>
  );
};
export default SiderMenu;
