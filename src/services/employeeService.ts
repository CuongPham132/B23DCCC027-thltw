import { Employee } from '../models/employee';

const STORAGE_KEY = 'employees';

export const employeeService = {
  getAllEmployees: (): Employee[] => {
    const employees = localStorage.getItem(STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
  },

  saveEmployees: (employees: Employee[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },

  addEmployee: (employee: Employee): void => {
    const employees = employeeService.getAllEmployees();
    employees.push(employee);
    employeeService.saveEmployees(employees);
  },

  updateEmployee: (employee: Employee): void => {
    const employees = employeeService.getAllEmployees();
    const index = employees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      employees[index] = employee;
      employeeService.saveEmployees(employees);
    }
  },

  deleteEmployee: (id: string): void => {
    const employees = employeeService.getAllEmployees();
    const filteredEmployees = employees.filter((e) => e.id !== id);
    employeeService.saveEmployees(filteredEmployees);
  },

  generateEmployeeId: (): string => {
    const employees = employeeService.getAllEmployees();
    const maxId = Math.max(...employees.map((e) => parseInt(e.id.replace('NV', ''))), 0);
    return `NV${String(maxId + 1).padStart(4, '0')}`;
  },
}; 