import React from 'react';
import 'antd/dist/antd.css';
import './SiderMenu.scss';
import {
  DesktopOutlined,
  FileOutlined,
  InfoOutlined,
  PieChartOutlined,
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
            alt='alt'
          />
          QUANGBAO
        </Link>
      </Menu.Item>
      <SubMenu key='sub2' icon={<DesktopOutlined />} title='Sản Xuất'>
        <Menu.Item key='8'>Đối Tác,Khách Hàng</Menu.Item>
        <Menu.Item key='9'>Nhà Cung Cấp</Menu.Item>
        <Menu.Item key='10'>Thiết Bị</Menu.Item>
        <Menu.Item key='11'>Sản Phẩm Lỗi</Menu.Item>
        <Menu.Item key='12'>Thanh Toán,Công Nợ</Menu.Item>
        <Menu.Item key='13'>Kho</Menu.Item>
      </SubMenu>
      <SubMenu
        key='sub1'
        icon={<PieChartOutlined />}
        title='Nhân Sự'
        defaultSelectedKeys={[]}
      >
        <Menu.Item key='1'>
          <Link to='/admin/nhan-vien'>Nhân Viên</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to='/admin/chuc-vu'>Chức Vụ</Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link to='/admin/hop-dong-lao-dong'>Hợp Đồng Lao Động</Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <Link to='/admin/cham-cong'>Chấm Công</Link>
        </Menu.Item>
        <Menu.Item key='6'>
          <Link to='/admin/trinh-do'>Trình Độ</Link>
        </Menu.Item>
        <Menu.Item key='7'>
          <Link to='/admin/luong'>Lương</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key='sub3' icon={<UserOutlined />} title='User'>
        <Menu.Item key='14'>Tom</Menu.Item>
        <Menu.Item key='15'>Bill</Menu.Item>
        <Menu.Item key='16'>Alex</Menu.Item>
      </SubMenu>
      <Menu.Item key='17' icon={<FileOutlined />}>
        Thống Kê
      </Menu.Item>
      <Menu.Item key='18' icon={<InfoOutlined />}>
        <Link to='/admin/thong-tin-cong-ty'>Thông Tin Công Ty</Link>
      </Menu.Item>
    </Menu>
  );
};
export default SiderMenu;
