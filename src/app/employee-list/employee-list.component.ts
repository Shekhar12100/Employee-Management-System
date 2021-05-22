import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import {EmployeeService} from '../shared/employee.service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(public empService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.empService.getEmployees().subscribe((data: Employee[]) => {
      console.log(data);
      this.employees = data;
    });
  }

  deleteEmployee(employee) {
    this.empService.deleteEmployee(employee.id).subscribe(
      data => {
        this.employees = this.employees.filter(emp => emp !== employee);
      }
    );
  }



}
