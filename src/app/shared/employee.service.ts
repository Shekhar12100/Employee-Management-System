import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import {Observable, throwError} from 'rxjs';
import {retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'http://localhost:3000/employee/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl +id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  addEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  editEmployee(employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl + employee.id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteEmployee(id) {
    return this.http.delete<Employee>(this.apiUrl + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
