export enum EmployeeStatus {
  TRIAL = 'Thử việc',
  CONTRACTED = 'Đã ký hợp đồng',
}

export enum Position {
  MANAGER = 'Quản lý',
  DEVELOPER = 'Lập trình viên',
  DESIGNER = 'Thiết kế',
  HR = 'Nhân sự',
  ACCOUNTANT = 'Kế toán',
}

export enum Department {
  IT = 'Công nghệ thông tin',
  HR = 'Nhân sự',
  FINANCE = 'Tài chính',
  MARKETING = 'Marketing',
  SALES = 'Kinh doanh',
}

export interface Employee {
  id: string;
  name: string;
  position: Position;
  department: Department;
  salary: number;
  status: EmployeeStatus;
}

export interface EmployeeFilters {
  position?: Position;
  department?: Department;
  searchText?: string;
} 