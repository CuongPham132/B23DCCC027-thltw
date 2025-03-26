import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { getPhongHocByMa, savePhongHoc, PhongHoc } from '@/services/phongHoc';

const { Option } = Select;

const danhSachNguoiPhuTrach = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];

const ThemChinhSuaPhong: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { maPhong } = useParams<{ maPhong?: string }>();

  useEffect(() => {
    if (maPhong) {
      const phong = getPhongHocByMa(maPhong);
      if (phong) form.setFieldsValue(phong);
      else message.error('Không tìm thấy phòng');
    }
  }, [maPhong, form]);

  const onFinish = (values: PhongHoc) => {
    const success = savePhongHoc(values);
    if (success) {
      message.success('Lưu phòng học thành công');
      history.push('/khoa-hoc'); // ✅ Quay về danh sách sau khi lưu
    } else {
      message.error('Tên phòng bị trùng hoặc dữ liệu không hợp lệ');
    }
  };

  const handleBack = () => {
    history.goBack(); // ✅ Luôn quay về danh sách
    // Hoặc nếu muốn về trang trước đó: history.goBack();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ loaiPhong: 'Lý thuyết' }}
      >
        <Form.Item
          label="Mã phòng"
          name="maPhong"
          rules={[{ required: true, message: 'Vui lòng nhập mã phòng' }, { max: 10 }]}
        >
          <Input disabled={!!maPhong} />
        </Form.Item>

        <Form.Item
          label="Tên phòng"
          name="tenPhong"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng' }, { max: 50 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Người phụ trách"
          name="nguoiPhuTrach"
          rules={[{ required: true, message: 'Chọn người phụ trách' }]}
        >
          <Select>
            {danhSachNguoiPhuTrach.map((nguoi) => (
              <Option key={nguoi} value={nguoi}>
                {nguoi}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Số chỗ ngồi"
          name="soChoNgoi"
          rules={[{ required: true, message: 'Nhập số chỗ ngồi' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Loại phòng"
          name="loaiPhong"
          rules={[{ required: true, message: 'Chọn loại phòng' }]}
        >
          <Select>
            <Option value="Lý thuyết">Lý thuyết</Option>
            <Option value="Thực hành">Thực hành</Option>
            <Option value="Hội trường">Hội trường</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Lưu</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleBack}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ThemChinhSuaPhong;
