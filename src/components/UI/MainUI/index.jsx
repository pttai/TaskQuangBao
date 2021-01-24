import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Dropdown, Layout, Avatar, Menu } from 'antd';
import SiderMenu from '../SiderMenu/SiderMenu';
import Charts from '../Admin/Charts/Charts';
import { Route, Switch } from 'react-router';
import ListStaff from '../NhanSu/HoSoNhanSu/ListStaff/ListStaff';
import {
  AntDesignOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ListChucVu from '../NhanSu/ChucVu/ListChucVu/ListChucVu';
import ListHopDong from '../NhanSu/HopDongLaoDong/ListHopDong/ListHopDong';
import ListTrinhDo from '../NhanSu/TrinhDo/ListTrinhDo/ListTrinhDo';
import TabsChamCong from '../NhanSu/ChamCong/TabsChamCong/TabsChamCong';
import TabsLuong from '../NhanSu/Luong/TabsLuong/TabsLuong';
import ThongTin from '../ThongTinCongTy/ThongTin/ThongTin';

const { Header, Content, Footer, Sider } = Layout;

const menu = (
  <Menu>
    <Menu.Item key='1' icon={<EditOutlined />}>
      Thiết lập
    </Menu.Item>
    <Menu.Item key='2' icon={<UserOutlined />}>
      phantantai
    </Menu.Item>
    <Menu.Item key='3' icon={<LogoutOutlined />}>
      <Link to='/'>Đăng xuất</Link>
    </Menu.Item>
  </Menu>
);

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
    };
  }
  componentWillMount() {
    this.getChartData();
  }
  getChartData() {
    this.setState({
      chartData: {
        labels: ['Boston', 'Binh', 'Tai', 'Phong', 'Tam'],
        datasets: [
          {
            label: 'Population',
            data: [120000, 125478, 123654, 102314, 102154],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      },
    });
  }
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          width={280}
          collapsedWidth={80}
          className='Sider-custom'
        >
          <SiderMenu />
        </Sider>
        <Layout>
          <Header
            className='site-layout-background'
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: 80,
              backgroundColor: 'white',
            }}
          >
            <Dropdown overlay={menu} placement='bottomCenter'>
              {<Avatar size='large' icon={<AntDesignOutlined />} />}
            </Dropdown>
          </Header>
          <Content style={{ margin: '0 50px' }}>
            <Switch>
              <Route
                path='/admin'
                exact
                component={() => (
                  <div
                    className='site-layout-background'
                    style={{ padding: 24, minHeight: 360, marginTop: -20 }}
                  >
                    <Charts
                      chartData={this.state.chartData}
                      legendPosition='bottom'
                      location=' Lương'
                    />
                  </div>
                )}
              />
              <Route path='/admin/nhan-vien' component={ListStaff} />
              <Route path='/admin/chuc-vu' component={ListChucVu} />
              <Route path='/admin/hop-dong-lao-dong' component={ListHopDong} />
              <Route path='/admin/cham-cong' component={TabsChamCong} />
              <Route path='/admin/trinh-do' component={ListTrinhDo} />
              <Route path='/admin/luong' component={TabsLuong} />
              <Route path='/admin/thong-tin-cong-ty' component={ThongTin} />
            </Switch>
            <Layout>
              <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Index;
