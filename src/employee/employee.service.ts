import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationInput } from 'src/dto/pagination.args';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { SortOrderInputEmployee } from './dto/getall-employee.args';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<EmployeeDocument>,
  ) {}

  /**
   * Get all employees (paginated, sorted)
   */
  async findAll(
    pag: PaginationInput,
    sort: SortOrderInputEmployee,
  ): Promise<Employee[]> {
    const { page, limit } = pag;
    const sortBy = Object.keys(sort)[0];

    return this.employeeModel
      .find()
      .sort({ [sortBy]: sort[sortBy] })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  /**
   * Get an employee by id
   * @param id - employee id
   */
  async findOne(id: string): Promise<Employee> {
    return this.employeeModel.findById(id).exec();
  }

  /**
   * Get many employees by ids
   * @param ids - employee ids
   */
  async findMany(ids: string[]): Promise<Employee[]> {
    return this.employeeModel.find({ _id: { $in: ids } }).exec();
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
  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
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
  async remove(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
