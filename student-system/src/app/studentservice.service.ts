import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ListstudentComponent } from './liststudent/liststudent.component';
import { Students } from './Models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  apiUrl = 'https://localhost:44308/api/getAllStudents';
  deleteUrl = 'https://localhost:44308/api/delete/';
  createUrl = 'https://localhost:44308/api/createStudent';
  coursesUrl = 'https://localhost:44308/api/courses';
  classesUrl = 'https://localhost:44308/api/classes';
  getStdUrl = 'https://localhost:44308/api/getStudent';
  updateUrl= 'https://localhost:44308/api/edit'

  
  constructor(private http: HttpClient) {}

  getStudentsAll(){
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteStudent(id: number){
    return this.http.delete(`${this.deleteUrl}${id}`);
  }

  addStudent(data: any){
    return this.http.post(this.createUrl,data);
  }
  
  getCourses(){
    return this.http.get<any[]>(this.coursesUrl);
  }

  getClasses(){
    return this.http.get<any[]>(this.classesUrl);
  }

  getStudentById(id: number) {
    return this.http.get<Students>(`${this.getStdUrl}/${id}`);
  }


  updateStudent(id: number,data: any) {
    return this.http.put(`${this.updateUrl}/${id}`, data);
  }

}

