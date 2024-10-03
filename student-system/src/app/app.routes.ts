import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { StudentComponent } from './student/student.component';
import { ListstudentComponent } from './liststudent/liststudent.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditstudentComponent } from './editstudent/editstudent.component';

export const routes: Routes = [
    {
        path:'homepage',
        component: HomepageComponent,
        title:'Home Page'
    },
    {
        path:'student',
        component: StudentComponent,
        title:'Student Page'
    },
    {
        path:'list-student',
        component: ListstudentComponent,
        title:'List Student',
    },
    {
        path:'edit-student/:id',
        component: EditstudentComponent,
        title:'EditStudent',   
    }


];
