import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  addForm!: FormGroup;
  isList = true;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.addForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      nienKhoa: ['', [Validators.required]],
      tuoi: ['', [Validators.required]],
    });
  }

  getStudents(): void {
    this.studentService
      .getStudents()
      .subscribe((students) => (this.students = students));
  }

  delete(student: Student): void {
    this.students = this.students.filter((s) => s !== student);
    this.studentService.deleteStudent(student.id).subscribe();
  }

  onAdd(): void {
    this.isList = false;
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.studentService.addStudent(this.addForm.value).subscribe(student=>this.students.push(student));
      this.isList = true;
    }
  }
}
