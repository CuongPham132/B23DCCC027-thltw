import { useState } from 'react';
import { PhongHoc, getAllPhongHoc, savePhongHoc, deletePhongHocByMa } from '@/services/phongHoc';

export default () => {
  const [danhSachPhongHoc, setDanhSachPhongHoc] = useState<PhongHoc[]>([]);

  const fetchPhongHoc = () => {
    const data = getAllPhongHoc();
    setDanhSachPhongHoc(data);
  };

  const addOrUpdate = (phong: PhongHoc) => {
    savePhongHoc(phong);
    fetchPhongHoc();
  };

  const deletePhongHoc = (maPhong: string) => {
    deletePhongHocByMa(maPhong);
    fetchPhongHoc();
  };

  return {
    danhSachPhongHoc,
    fetchPhongHoc,
    addOrUpdate,
    deletePhongHoc,
  };
};
