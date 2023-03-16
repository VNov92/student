import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentUrl = 'https://dummyjson.com/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET: students from the server */
  getStudents(): Observable<Student[]> {
    const url = `${this.studentUrl}/?limit=5&select=id,firstName`;
    return this.http.get<Student[]>(url).pipe(
      map((datas: any) => datas.users),
      tap((_) => this.log('fetched students')),
      catchError(this.handleError<Student[]>('getStudents', []))
    );
  }

  /** GET: student by id. Will 404 if id not found */
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentUrl}/${id}`;

    return this.http.get<Student>(url).pipe(
      tap((_) => this.log(`fetched student id = ${id}`)),
      catchError(this.handleError<Student>(`getStudent id = ${id}`))
    );
  }

  /** GET: students whose name contains search term */
  searchStudents(term: string): Observable<Student[]> {
    if (!term.trim()) {
      // if not search term, return empty student array
      return of([]);
    }
    const url = `${this.studentUrl}/search?q=${term}`;
    return this.http.get<Student[]>(url).pipe(
      map((datas: any) => datas.users),
      tap((x) =>
        x.length
          ? this.log(`founded students matching "${term}"`)
          : this.log(`no students matching "${term}"`)
      ),
      catchError(this.handleError<Student[]>('searchStudent', []))
    );
  }

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    return this.http
      .post<Student>(this.studentUrl, student, this.httpOptions)
      .pipe(
        tap((newStudent: Student) =>
          this.log(`added student id = ${newStudent.id}`)
        ),
        catchError(this.handleError<Student>('addStudent'))
      );
  }

  /** POST: update the student on the server */
  updateStudent(student: Student): Observable<Student> {
    const url = `${this.studentUrl}/${student.id}`;
    return this.http.put<Student>(url, student, this.httpOptions).pipe(
      tap((_) => this.log(`updated student id = ${student.id}`)),
      catchError(this.handleError<Student>('updateStudent'))
    );
  }

  /** DELETE: delete the student from the server */
  deleteStudent(id: number): Observable<Student> {
    const url = `${this.studentUrl}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /**
   * Handle Http operation that failed
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @returns - Let app continue.
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StudentService: ${message}`);
  }
}
