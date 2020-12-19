import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import FormAdd from '../FormAdd/FormAdd';

const TaskAdd = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button
        type='primary'
        style={{ borderRadius: 7 }}
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Thêm Nhân Viên
      </Button>
      <Modal
        title='Thêm Nhân Viên'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <FormAdd />
      </Modal>
    </>
  );
};
export default TaskAdd;
