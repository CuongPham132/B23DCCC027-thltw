import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Input, Select, message, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Employee, Position, Department, EmployeeStatus, EmployeeFilters } from '../models/employee';
import { employeeService } from '../services/employeeService';
import EmployeeForm from '../components/EmployeeForm';

const { Option } = Select;

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [filters, setFilters] = useState<EmployeeFilters>({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const data = employeeService.getAllEmployees();
    setEmployees(data);
  };

  const handleAdd = () => {
    setEditingEmployee(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Employee) => {
    setEditingEmployee(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: Employee) => {
    if (record.status === EmployeeStatus.CONTRACTED) {
      message.error('Không thể xóa nhân viên đã ký hợp đồng!');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa nhân viên này?',
      onOk: () => {
        employeeService.deleteEmployee(record.id);
        message.success('Xóa nhân viên thành công!');
        loadEmployees();
      },
    });
  };

  const handleSubmit = (values: Employee) => {
    if (editingEmployee) {
      employeeService.updateEmployee({ ...values, id: editingEmployee.id });
      message.success('Cập nhật nhân viên thành công!');
    } else {
      employeeService.addEmployee({ ...values, id: employeeService.generateEmployeeId() });
      message.success('Thêm nhân viên thành công!');
    }
    setIsModalVisible(false);
    loadEmployees();
  };

  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Lương',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary: number) => salary.toLocaleString('vi-VN') + ' đ',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Employee) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const filteredEmployees = employees
    .filter((employee) => {
      if (filters.position && employee.position !== filters.position) return false;
      if (filters.department && employee.department !== filters.department) return false;
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        return (
          employee.id.toLowerCase().includes(searchLower) ||
          employee.name.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => b.salary - a.salary);

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Quản lý nhân viên">
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Thêm nhân viên
          </Button>
          <Select
            style={{ width: 200 }}
            placeholder="Lọc theo chức vụ"
            onChange={(value) => setFilters({ ...filters, position: value })}
            allowClear
          >
            {Object.values(Position).map((pos) => (
              <Option key={pos} value={pos}>
                {pos}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 200 }}
            placeholder="Lọc theo phòng ban"
            onChange={(value) => setFilters({ ...filters, department: value })}
            allowClear
          >
            {Object.values(Department).map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
          <Input
            placeholder="Tìm kiếm theo mã hoặc tên"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        <EmployeeForm
          initialValues={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeManagement; 