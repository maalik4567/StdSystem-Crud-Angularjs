import {NgModule, OnInit} from '@angular/core';
import {FormsModule}   from '@angular/forms';
import { Component } from '@angular/core';
import { StudentserviceService } from '../studentservice.service';
import { Inject,inject } from '@angular/core';
import { Students } from '../Models/students';
import { NgFor } from '@angular/common';
import { Text } from '@angular/compiler';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  //studentService= inject(StudentserviceService);

  student: Students = {
    Id: 0,
    Name: '',
    Courses: '',
    Class: '',
    ContactNumber: '',
    MarkedCourseIds:''
  };

  selectedCourses: string[] = [];
  availableCourses: { Value: string, Text: string }[] = [];
  availableClasses: { Value: string, Text: string }[] = [];
 
  studentService= inject(StudentserviceService);

  // Validation state properties
  nameValid: boolean = true;
  contactValid: boolean = true;
  classValid: boolean = true;
  coursesValid: boolean = true;

  ngOnInit(): void {
    this.loadCourses();
    this.loadClasses();
  }

  loadCourses(): void {
    this.studentService.getCourses().subscribe((data) => {
      console.log("Course List", data);
      this.availableCourses = data.map(course => ({ Value: course.Value, Text: course.Text }));
      console.log(this.availableCourses);
    });
  }

  loadClasses(): void {
    this.studentService.getClasses().subscribe((data) => {
      console.log("Class List", data);
      this.availableClasses = data.map(classVal => ({ Value: classVal.Value, Text: classVal.Text }));
      console.log(this.availableClasses);
    });
  }

  addCourse(courseValue: string): void {
    if (courseValue && !this.selectedCourses.includes(courseValue)) {
      this.selectedCourses.push(courseValue);
    }
  }

  removeCourse(courseValue: string): void {
    this.selectedCourses = this.selectedCourses.filter(value => value !== courseValue);
  }

  onSubmit(): void {

     // Reset validation flags
     this.nameValid = !!this.student.Name;
     this.contactValid = !!this.student.ContactNumber;
     this.classValid = !!this.student.Class;
     this.coursesValid = this.selectedCourses.length > 0;

    if (!this.student.Name || !this.student.ContactNumber || !this.student.Class || this.selectedCourses.length === 0) {
      // Display validation error or handle it accordingly
      return;
    }

    const studentData = {
      student: {
        Name: this.student.Name,
        ContactNumber: this.student.ContactNumber,
        Class: this.student.Class,
      },
       MarkedCourses: this.selectedCourses.map(course => {
      const foundCourse = this.availableCourses.find(c => c.Text === course);
      return foundCourse ? foundCourse.Value : null;
    }).filter(value => value !== null)
    };

    console.log(this.selectedCourses);
    console.log(studentData);
    this.studentService.addStudent(studentData).subscribe(() => {
      this.resetForm();
    });
  }

  resetForm(): void {
    this.student = {
      Id: 0,
      Name: '',
      Courses: '',
      Class: '',
      ContactNumber: '',
      MarkedCourseIds:''
    };
    this.selectedCourses = [];
  }



}
