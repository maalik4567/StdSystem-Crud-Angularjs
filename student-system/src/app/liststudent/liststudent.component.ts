import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { Interface } from 'readline';
import { StudentComponent } from '../student/student.component';
import { Students } from '../Models/students';
import { StudentserviceService } from '../studentservice.service';
import { Inject,inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// export Interface Students{

// }

@Component({
  selector: 'app-liststudent',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './liststudent.component.html',
  styleUrl: './liststudent.component.css'
})
export class ListstudentComponent implements OnInit {
   studentList :  Students[] = [];
   studentService = inject(StudentserviceService);

   ngOnInit(): void {
    this.getAllStudents();
  }

   getAllStudents(){
      this.studentService.getStudentsAll().subscribe((res)=>{
         this.studentList = res;
      })
   }

   deleteStudent(id: number){
    const isConfirm = confirm( "Are you sure want to delete student this student");
    if(isConfirm){
      this.studentService.deleteStudent(id).subscribe((res)=>{
        console.log(res);
        alert("Student Deleted Successfully!!")
        this.getAllStudents();
      })
    }
  }
}
