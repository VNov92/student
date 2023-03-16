import { Component } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  student: Student = {
    id: 1,
    nienKhoa: '2023-2024',
    fullName: 'Ngo The Vu',
    tuoi: 31
  }
}
