import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../shared/employee.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  empEditForm: FormGroup;
  id: any;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private router: Router, public empService: EmployeeService, public fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.empEditForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      emailId: ['', [Validators.required, Validators.pattern(this.emailRegEx)]]
    });

    this.id = this.route.snapshot.paramMap.get('id');

    this.empService.getEmployee(this.id).subscribe(
      data => {
        this.empEditForm.setValue(data)
      }
    );
  }

  submitEditForm() {
    this.empService.editEmployee(this.empEditForm.value).subscribe(res => {
      console.log(res);
      console.log('Employee Updated!')
      this.router.navigateByUrl('/employee-list')
    })
  }

}
