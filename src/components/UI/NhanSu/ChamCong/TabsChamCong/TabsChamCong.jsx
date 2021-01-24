import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import ListChamCong from '../ListChamCong/ListChamCong';
import KetQuaChamCong from '../KetQuaChamCong/KetQuaChamCong';
import ChamCongThang from '../ChamCongThang/ChamCongThang';

const { TabPane } = Tabs;

const callback = (key) => {
  console.log(key);
};

const TabsChamCong = (props) => {
  return (
    <Tabs defaultActiveKey='1' onChange={callback}>
      <TabPane tab='Chấm Công' key='1'>
        <ListChamCong />
      </TabPane>
      <TabPane tab='Kết Quả' key='2'>
        <KetQuaChamCong />
      </TabPane>
      <TabPane tab='Chấm Theo Tháng' key='3'>
        <ChamCongThang />
      </TabPane>
    </Tabs>
  );
};

export default TabsChamCong;
