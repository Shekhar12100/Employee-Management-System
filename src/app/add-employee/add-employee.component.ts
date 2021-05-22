import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  empForm: FormGroup;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  ngOnInit() {
    this.empForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      emailId: ['', [Validators.required, Validators.pattern(this.emailRegEx)]]
    })
  }

  constructor(private router: Router, public empService: EmployeeService, public fb: FormBuilder) { }

  submitForm() {
    this.empService.addEmployee(this.empForm.value).subscribe(res => {
      console.log('Employee Added!')
      this.router.navigateByUrl('/employee-list')
    })
  }


}
