import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import ListLuongCoBan from '../LuongCoBan/ListLuongCoBan/ListLuongCoBan';
import ListLuongHeSo from '../LuongHeSo/ListLuongHeSo/ListLuongHeSo';
import ListBac from '../Bac/ListBac/ListBac';

const { TabPane } = Tabs;

const callback = (key) => {
  console.log(key);
};

const TabsLuong = (props) => {
  return (
    <Tabs defaultActiveKey='1' onChange={callback}>
      <TabPane tab='Lương Cơ Bản' key='1'>
        <ListLuongCoBan />
      </TabPane>
      <TabPane tab='Lương Hệ Số' key='2'>
        <ListLuongHeSo />
      </TabPane>
      <TabPane tab='Bậc' key='3'>
        <ListBac />
      </TabPane>
    </Tabs>
  );
};

export default TabsLuong;
