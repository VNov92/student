import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  addForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
  });
  isList = true;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStudents();
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
      var myFormData = new FormData();
      myFormData.append('firstName', this.addForm.value.firstName);
    }
  }
}
