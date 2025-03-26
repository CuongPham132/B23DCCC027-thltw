export interface PhongHoc {
    maPhong: string;
    tenPhong: string;
    soChoNgoi: number;
    loaiPhong: string;
    nguoiPhuTrach: string;
  }
  
  const STORAGE_KEY = 'phong_hoc_data';
  
  // Lấy toàn bộ danh sách phòng học
  const getAllPhongHoc = (): PhongHoc[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };
  
  // Lưu danh sách vào localStorage
  const savePhongHocList = (list: PhongHoc[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };
  
  // Thêm hoặc cập nhật phòng học, kiểm tra trùng tên
  const savePhongHoc = (phong: PhongHoc): boolean => {
    const list = getAllPhongHoc();
  
    const isDuplicate = list.some(
      (p) => p.tenPhong === phong.tenPhong && p.maPhong !== phong.maPhong
    );
    if (isDuplicate) return false;
  
    const index = list.findIndex((p) => p.maPhong === phong.maPhong);
    if (index !== -1) {
      list[index] = phong;
    } else {
      list.push(phong);
    }
    savePhongHocList(list);
    return true;
  };
  
  // Xóa phòng học theo mã
  const deletePhongHocByMa = (maPhong: string) => {
    const list = getAllPhongHoc().filter((p) => p.maPhong !== maPhong);
    savePhongHocList(list);
  };
  
  // Tìm kiếm phòng học theo mã
  const getPhongHocByMa = (maPhong: string): PhongHoc | undefined => {
    const danhSach = getAllPhongHoc();
    return danhSach.find((phong) => phong.maPhong === maPhong);
  };
  
  // ✅ Export chuẩn
  export {
    getAllPhongHoc,
    savePhongHocList,
    savePhongHoc,         // Đổi tên addOrUpdatePhongHoc thành savePhongHoc
    deletePhongHocByMa,
    getPhongHocByMa,
  };
  