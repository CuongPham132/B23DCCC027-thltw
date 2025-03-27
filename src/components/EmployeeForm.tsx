import React from 'react';
import { Form, Input, Select, InputNumber, Button, message } from 'antd';
import { Employee, Position, Department, EmployeeStatus } from '../models/employee';

interface EmployeeFormProps {
  initialValues?: Employee;
  onSubmit: (values: Employee) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      message.error('Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        label="Họ tên"
        rules={[
          { required: true, message: 'Vui lòng nhập họ tên!' },
          { max: 50, message: 'Họ tên không được vượt quá 50 ký tự!' },
          { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, message: 'Họ tên không được chứa ký tự đặc biệt!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="position"
        label="Chức vụ"
        rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
      >
        <Select>
          {Object.values(Position).map((pos) => (
            <Select.Option key={pos} value={pos}>
              {pos}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="department"
        label="Phòng ban"
        rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
      >
        <Select>
          {Object.values(Department).map((dept) => (
            <Select.Option key={dept} value={dept}>
              {dept}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="salary"
        label="Lương"
        rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          min={0}
        />
      </Form.Item>

      <Form.Item
        name="status"
        label="Trạng thái"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
      >
        <Select>
          {Object.values(EmployeeStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onCancel}>
          Hủy
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm; 