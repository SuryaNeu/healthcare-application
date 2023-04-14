import { Component, OnInit,LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public userInfo: any;
  public selectedDoctor: any;
  public doctorDetails: any;
  public appointmentDetails: any;
  public appointmentDate: any;
  public appointmentTitle: any;
  public questionTitle: any;
  public questionDetails: any;

  constructor(private appService: AppService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    console.log(this.userInfo);

    this.appService.getAppointments(this.userInfo.userId).subscribe((data) => {
      if(data.status === 200) {
        console.log("Appointments fetched successfully!");
        this.appointmentDetails = data?.data[0]?.appointments;
      } else {
        console.log(data.message);
      }
    }, (err) => {
      console.log("Technical error occured while fetching appointments: " + err);
    });

    this.appService.getQuestions(this.userInfo.userId).subscribe((data) => {
      if(data.status === 200) {
        console.log("Questions fetched successfully!");
        this.questionDetails = data?.data[0]?.questions;
      } else {
        console.log(data.message);
      }
    }, (err) => {
      console.log("Technical error occured while fetching questions: " + err);
    });

    this.appService.getAllDoctors().subscribe((data) => {
      if(data.status === 200) {
        console.log("DoctorDetails fetched successfully!");
        this.doctorDetails = data?.data;
      } else {
        console.log(data.message);
      }
    }, (err) => {
      console.log("Technical error occured while fetching doctorDetails: " + err);
    });
  }

  postAppointment() {
    let acquiredDate = new Date(this.appointmentDate);
    if(new Date() > acquiredDate) {
      this.toastr.error("Please select a future date");
      return;
    }
    this.toastr.info('Creating...');
    if(this.appointmentDetails?.length >= 0) {
      this.addAppointment();
    } else {
      this.createAppointment();
    }
  }

  postQuestion() {
    this.toastr.info('Submitting...');
    if(this.questionDetails?.length >= 0) {
      this.addQuestion();
    } else {
      this.createQuestion();
    }
  }

  createQuestion() {
    let questionArray = [];
    let queObj = {
      id: 1,
      title: this.questionTitle,
      date: new Date().toLocaleString(),
      answer: '',
      answeredById: '',
      answeredByName: '',
      askedByName: this.userInfo.firstName + " " + this.userInfo.lastName
    };
    questionArray.push(queObj);
    let data = {
      userId: this.userInfo.userId,
      questions: JSON.stringify(questionArray)
    }

    this.appService.createQuestionFunction(data).subscribe((data) => {
      if(data.status === 200) {
        console.log('Question submitted successfully!');
        this.toastr.success('Question submitted successfully!');

        setTimeout(() => {
          this.router.navigate(['/profile']);
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

  createAppointment() {
    let selectedDoctorObject = this.doctorDetails.find(x => x.userId == this.selectedDoctor);
    let appointmentArray = [];
    let appObj = {
      id: 1,
      title: this.appointmentTitle,
      date: this.appointmentDate,
      doctorId: this.selectedDoctor,
      doctorName: selectedDoctorObject.firstName + " " + selectedDoctorObject.lastName,
      patientName: this.userInfo.firstName + " " + this.userInfo.lastName
    };
    appointmentArray.push(appObj);
    let data = {
      userId: this.userInfo.userId,
      appointments: JSON.stringify(appointmentArray)
    }

    this.appService.createAppointmentFunction(data).subscribe((data) => {
      if(data.status === 200) {
        console.log('Appointment created successfully!');
        this.toastr.success('Appointment created successfully!');

        let mailData = {
          email: selectedDoctorObject.email,
          subject: 'Medibuddy: New Appointment Created!',
          text: `
          <div style="text-align: left; margin-left: 10px; font-family: Roboto, sans-serif;">
                <h2>Hey ${selectedDoctorObject.firstName} ${selectedDoctorObject.lastName}!</h2>
              </div>
              <div style="text-align: center; font-family: Roboto, sans-serif;">
                <h1>You've received a new appointment from ${this.userInfo.firstName} ${this.userInfo.lastName} and it is scheduled on ${formatDate(this.appointmentDate, 'medium', 'en-US')}!</h1>
                <p>Login to view more details!</p>
              </div>
          `
        }

        this.appService.sendMail(mailData).subscribe(response => console.log('Mail sent!'), err => console.log(err));

        setTimeout(() => {
          this.router.navigate(['/profile']);
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

  addQuestion() {
    let data = {
      userId: this.userInfo.userId,
      id: 1,
      title: this.questionTitle,
      date: new Date().toLocaleString(),
      answer: '',
      answeredById: '',
      answeredByName: '',
      askedByName: this.userInfo.firstName + " " + this.userInfo.lastName
    };

    this.appService.addQuestionFunction(data).subscribe((data) => {
      if(data.status === 200) {
        console.log('Question submiited successfully!');
        this.toastr.success('Question submitted successfully!');

        setTimeout(() => {
          this.router.navigate(['/profile']);
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
  

  addAppointment() {
    let selectedDoctorObject = this.doctorDetails.find(x => x.userId == this.selectedDoctor);
    let data = {
      userId: this.userInfo.userId,
      id: 1,
      title: this.appointmentTitle,
      date: this.appointmentDate,
      doctorId: this.selectedDoctor,
      doctorName: selectedDoctorObject.firstName + " " + selectedDoctorObject.lastName,
      patientName: this.userInfo.firstName + " " + this.userInfo.lastName
    };

    this.appService.addAppointmentFunction(data).subscribe((data) => {
      if(data.status === 200) {
        console.log('Appointment created successfully!');
        this.toastr.success('Appointment created successfully!');

        let mailData = {
          email: selectedDoctorObject.email,
          subject: 'Medibuddy: New Appointment Created!',
          text: `
          <div style="text-align: left; margin-left: 10px; font-family: Roboto, sans-serif;">
                <h2>Hey ${selectedDoctorObject.firstName} ${selectedDoctorObject.lastName}!</h2>
              </div>
              <div style="text-align: center; font-family: Roboto, sans-serif;">
                <h1>You've received a new appointment from ${this.userInfo.firstName} ${this.userInfo.lastName} and it is scheduled on ${formatDate(this.appointmentDate, 'medium', 'en-US')}!</h1>
                <p>Login to track your appointments and view more details!</p>
              </div>
          `
        }

        this.appService.sendMail(mailData).subscribe(response => console.log('Mail sent!'), err => console.log(err));

        setTimeout(() => {
          this.router.navigate(['/profile']);
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
