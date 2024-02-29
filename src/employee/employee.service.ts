import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
  ) {}

  /**
   * Get all employees
   */
  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  /**
   * Get an employee by id
   * @param id - employee id
   */
  async findOne(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).exec();
  }

  /**
   * Create an employee
   * @param employee - employee data
   */
  async create(employee: Employee): Promise<Employee> {
    const newEmployee = new this.employeeModel(employee);
    return newEmployee.save();
  }

  /**
   * Update an employee by id
   * @param id - employee id
   * @param employee - employee data
   */
  async update(id: string, employee: Employee): Promise<Employee> {
    return this.employeeModel
      .findByIdAndUpdate(id, employee, {
        new: true,
      })
      .exec();
  }

  /**
   * Delete an employee by id
   * @param id - employee id
   */
  async remove(id: string) {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
