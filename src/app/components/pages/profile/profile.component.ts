import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userInfo: any;
  public selectedDoctor: any;
  public doctorDetails: any;
  public appointmentDetails: any;
  public appointmentDate: any;
  public appointmentTitle: any;
  public allAppointments: any;
  public actualAppointments = [];
  public doctorAppointments: any;
  public completeQuestionDetails: any;
  public unansweredQuestionDetails: any;
  public answeredQuestionDetails: any;
  public allQuestions: any;
  public actualQuestions = [];

  constructor(private appService: AppService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    console.log(this.userInfo);

    if(this.userInfo.isDoctor) {
      this.appService.getAllAppointmentsFunction().subscribe((response) => {
        if(response.status === 200) {
          this.allAppointments = response.data;
          this.allAppointments.forEach(element => {
            this.actualAppointments = this.actualAppointments.concat(element.appointments);
          });
          // console.log(this.actualAppointments);
          this.appointmentDetails = this.actualAppointments.filter(x => x.doctorId === this.userInfo.userId);
          return;
        } else {
          console.log(response.message);
        }
      }, (err) => {
          console.log(err);
      });

      this.appService.getAllQuestionsFunction().subscribe((response) => {
        if(response.status === 200) {
          this.allQuestions = response.data;
          this.allQuestions.forEach(element => {
            this.actualQuestions = this.actualQuestions.concat(element.questions);
          });
          this.completeQuestionDetails = this.actualQuestions;
          this.answeredQuestionDetails = this.completeQuestionDetails.filter(x => x.answer != "");
          this.unansweredQuestionDetails = this.completeQuestionDetails.filter(x => x.answer == "");
          return;
        } else {
          console.log(response.message);
        }
      }, (err) => {
          console.log(err);
      });
    } else {
      this.appService.getAppointments(this.userInfo.userId).subscribe((data) => {
        console.log(data);
        if(data.status === 200 && data.data) {
          this.appointmentDetails = data?.data[0]?.appointments;
        } else {
          console.log(data.message);
        }
      }, (err) => {
        console.log(err);
      });

      this.appService.getQuestions(this.userInfo.userId).subscribe((data) => {
        console.log(data);
        if(data.status === 200 && data.data) {
          this.completeQuestionDetails = data?.data[0]?.questions;
          this.answeredQuestionDetails = this.completeQuestionDetails.filter(x => x.answer != "");
          this.unansweredQuestionDetails = this.completeQuestionDetails.filter(x => x.answer == "");
        } else {
          console.log(data.message);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  deleteAppointment(id, doctorId, appDate) {
    let data = {
      id: id
    }
    this.appService.deleteAppointmentFunction(data).subscribe((data) => {
      console.log(data);
      if(data.status === 200) {
        this.userInfo.isDoctor ? this.toastr.success("Rejected Successfully!") : this.toastr.success("Deleted Successfully!");

        if(this.userInfo.isDoctor) {
          let neededUserId;
          this.allAppointments.forEach(element => {
            if(element.appointments.find(x => x.id === id) !== undefined) {
              neededUserId = element.userId;
            }
          });
          this.appService.getSingleUserDetails(neededUserId).subscribe((response) => {
            let mailData = {
              email: response.data.email,
              subject: 'Medibuddy: Appointment Rejected!',
              text: `
              <div style="text-align: left; margin-left: 10px; font-family: Roboto, sans-serif;">
                    <h2>Hey ${response.data.firstName} ${response.data.lastName}!</h2>
                  </div><br>
                  <div style="text-align: center; font-family: Roboto, sans-serif;">
                    <h1>Doctor ${this.userInfo.firstName} ${this.userInfo.lastName} has rejected your appointment which is scheduled on ${formatDate(appDate, 'medium', 'en-US')}!</h1><br>
                    <p>Login to create another appointment and track them!</p>
                  </div>
              `
            }

            this.appService.sendMail(mailData).subscribe(sm => console.log('Mail sent!'), err => console.log(err));
          })
        } else {
          this.appService.getSingleUserDetails(doctorId).subscribe((response) => {
            let mailData = {
              email: response.data.email,
              subject: 'Medibuddy: Appointment Deleted!',
              text: `
              <div style="text-align: left; margin-left: 10px; font-family: Roboto, sans-serif;">
                    <h2>Hey ${response.data.firstName} ${response.data.lastName}!</h2>
                  </div><br>
                  <div style="text-align: center; font-family: Roboto, sans-serif;">
                    <h1>Patient ${this.userInfo.firstName} ${this.userInfo.lastName} has deleted an appointment which is scheduled on ${formatDate(appDate, 'medium', 'en-US')}!</h1><br>
                    <p>Login to check existing appointments and track them!</p>
                  </div>
              `
            }

            this.appService.sendMail(mailData).subscribe(sm => console.log('Mail sent!'), err => console.log(err));
          })
        }

        setTimeout(()=> {
          window.location.reload();
        }, 2000);
      } else {
        this.toastr.error(data.message);
        console.log(data.message);
      }
    }, (err) => {
      this.toastr.error("Technical error occured");
      console.log("Technical error occured while deleting appointment: " + err);
    });
  }

  editAppointment(id) {
    this.router.navigate(['/profile/edit/appointment', id]);
  }

  deleteQuestion(id) {
    let data = {
      id: id
    }
    this.appService.deleteQuestionFunction(data).subscribe((data) => {
      console.log(data);
      if(data.status === 200) {
        this.toastr.success("Deleted Successfully!");
        window.location.reload();
      } else {
        this.toastr.error(data.message);
        console.log(data.message);
      }
    }, (err) => {
      this.toastr.error("Technical error occured");
      console.log("Technical error occured while deleting question: " + err);
    });
  }

  editQuestion(id) {
    this.router.navigate(['/profile/edit/question', id]);
  }

  editQuestionHere(id, title, answer, askedByName) {
    if(answer == "") {
      this.toastr.error('Enter an answer to submit');
      return;
    }

    let data = {
      id: id,
      title: title,
      date: new Date().toLocaleString(),
      answer: answer,
      answeredById: this.userInfo.userId,
      answeredByName: this.userInfo.firstName + " " + this.userInfo.lastName,
      askedByName: askedByName
    };

    this.appService.editQuestionFunction(data).subscribe((data) => {
      if(data.status === 200) {
        console.log('Question Answered successfully!');
        this.toastr.success('Question Answered successfully!');

        if(this.userInfo.isDoctor) {
          let neededUserId;
          this.allQuestions.forEach(element => {
            if(element.questions.find(x => x.id === id) !== undefined) {
              neededUserId = element.userId;
            }
          });
          this.appService.getSingleUserDetails(neededUserId).subscribe((response) => {
            let mailData = {
              email: response.data.email,
              subject: 'Medibuddy: Question Answered!',
              text: `
              <div style="text-align: left; margin-left: 10px; font-family: Roboto, sans-serif;">
                    <h2>Hey ${response.data.firstName} ${response.data.lastName}!</h2>
                  </div><br>
                  <div style="text-align: center; font-family: Roboto, sans-serif;">
                    <h1>Your Question has been answered by Doctor ${this.userInfo.firstName} ${this.userInfo.lastName}!</h1><br>
                    <p>Login to check the answer and ask more!</p>
                  </div>
              `
            }

            this.appService.sendMail(mailData).subscribe(sm => console.log('Mail sent!'), err => console.log(err));
          })
        }

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.toastr.error(data.message);
        console.log(data.message);
      }
    }, (err) => {
      this.toastr.error("Technical error occured");
      console.log("Technical error occured: " + err);
    })
  }
}
