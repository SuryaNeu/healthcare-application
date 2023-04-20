import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url =  'http://localhost:3000';

  private subject = new Subject();
  sendMessage(isLoggedin) {
    this.subject.next(isLoggedin); 
 }

 onMessage(): Observable<any> { return this.subject.asObservable(); }

  constructor(public http: HttpClient, private Cookie: CookieService) { }

  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('isDoctor', data.isDoctor)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  }

  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of signinFunction function.

  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data)) 
  }

  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', this.Cookie.get('authtoken'))
  
    return this.http.post(`${this.url}/api/v1/users/logout`, params);
  
  } // end logout function

  public getAppointments(userId: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(`${this.url}/api/v1/users/appointment/detail?userId=${userId}`)
  }

  public getQuestions(userId: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get(`${this.url}/api/v1/users/question/detail?userId=${userId}`)
  }

  public getAllDoctors(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/getAllDoctors`);
  }

  public addAppointmentFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('userId', data.userId)
      .set('id', data.id)
      .set('title', data.title)
      .set('date', data.date)
      .set('doctorId', data.doctorId)
      .set('doctorName', data.doctorName)
      .set('patientName', data.patientName)

    return this.http.post(`${this.url}/api/v1/users/appointment/add`, params);

  } // end of addAppointment function.

  public addQuestionFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('userId', data.userId)
      .set('id', data.id)
      .set('title', data.title)
      .set('date', data.date)
      .set('answer', data.answer)
      .set('answeredById', data.answeredById)
      .set('answeredByName', data.answeredByName)
      .set('askedByName', data.askedByName)

    return this.http.post(`${this.url}/api/v1/users/question/add`, params);

  } // end of addQuestion function.

  public createAppointmentFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('userId', data.userId)
      .set('appointments', data.appointments);

    return this.http.post(`${this.url}/api/v1/users/appointment`, params);

  }

  public createQuestionFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('userId', data.userId)
      .set('questions', data.questions);

    return this.http.post(`${this.url}/api/v1/users/question`, params);

  }

  public deleteAppointmentFunction(data): Observable<any> {
    return this.http.put(this.url + '/api/v1/users/appointment/delete' + '/' + data.id, data);
  }

  public deleteQuestionFunction(data): Observable<any> {
    return this.http.put(this.url + '/api/v1/users/question/delete' + '/' + data.id, data);
  }

  public editAppointmentFunction(data): Observable<any> {

    const params = new HttpParams()
    .set('title', data.title)
    .set('date', data.date)
    .set('doctorId', data.doctorId)
    .set('doctorName', data.doctorName)
    .set('patientName', data.patientName);

    return this.http.put(this.url + '/api/v1/users/appointment/edit' + '/' + data.id, params);

  }

  public editQuestionFunction(data): Observable<any> {

    const params = new HttpParams()
    .set('title', data.title)
      .set('date', data.date)
      .set('answer', data.answer)
      .set('answeredById', data.answeredById)
      .set('answeredByName', data.answeredByName)
      .set('askedByName', data.askedByName);

    return this.http.put(this.url + '/api/v1/users/question/edit' + '/' + data.id, params);

  }

  public getAllAppointmentsFunction(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/appointment/all`);
  }

  public getAllQuestionsFunction(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/question/all`);
  }

  public getEmailVerification(email): Observable<any> {
    return this.http.get(`https://emailvalidation.abstractapi.com/v1/?api_key=4068e9760411481f83b5fe69d06fa043&email=${email}`);
  }

  public sendMail(data): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/send/email?email=${data.email}`, data);
  }

  public getSingleUserDetails(userId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/getSingleUserDetails/${userId}`);
  }
}
