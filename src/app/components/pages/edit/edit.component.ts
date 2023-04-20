import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public userInfo: any;
  public selectedDoctor: any;
  public doctorDetails: any;
  public appointmentDetails: any;
  public appointmentDate: any;
  public appointmentTitle: any;
  public appointmentId: any;
  public appointmentObj: any;
  public isAppointment: boolean;
  public isQuestion: boolean;
  public questionDetails: any;
  public questionObj: any;
  public questionId: any;
  public questionTitle: any;

  constructor(private appService: AppService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.appointmentId = activatedRoute.snapshot.params.id;
    this.isAppointment = activatedRoute.snapshot.routeConfig.path.includes('appointment');
    if(this.isAppointment) this.appointmentId = activatedRoute.snapshot.params.id;
    this.isQuestion = activatedRoute.snapshot.routeConfig.path.includes('question');
    if(this.isQuestion) this.questionId = activatedRoute.snapshot.params.id;
    console.log(activatedRoute.snapshot);
  }

  ngOnInit() {
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    console.log(this.userInfo);

    if(this.isAppointment) {
      this.appService.getAppointments(this.userInfo.userId).subscribe((data) => {
        if(data.status === 200) {
          console.log("Appointments fetched successfully!");
          this.appointmentDetails = data?.data[0]?.appointments;
          this.appointmentObj = this.appointmentDetails.find(x => x.id === this.appointmentId);
          this.appointmentTitle = this.appointmentObj.title;
          this.appointmentDate = this.appointmentObj.date;
          this.selectedDoctor = this.appointmentObj.doctorId;
        } else {
          console.log(data.message);
        }
      }, (err) => {
        console.log("Technical error occured while fetching appointments: " + err);
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
    if(this.isQuestion) {
      this.appService.getQuestions(this.userInfo.userId).subscribe((data) => {
        if(data.status === 200) {
          console.log("Questions fetched successfully!");
          this.questionDetails = data?.data[0]?.questions;
          this.questionObj = this.questionDetails.find(x => x.id === this.questionId);
          this.questionTitle = this.questionObj.title;
        } else {
          console.log(data.message);
        }
      }, (err) => {
        console.log("Technical error occured while fetching questions: " + err);
      });
    }
  }

  postAppointment() {
    let acquiredDate = new Date(this.appointmentDate);
    if(new Date() > acquiredDate) {
      this.toastr.error("Please select a future date");
      return;
    }
    this.toastr.info('Editing...');
    this.editAppointment();
  }

  postQuestion() {
    this.toastr.info('Editing...');
    this.editQuestion();
  }

  editQuestion() {
    let data = {
      id: this.questionId,
      title: this.questionTitle,
      date: new Date().toLocaleString(),
      answer: '',
      answeredById: '',
      answeredByName: '',
      askedByName: this.userInfo.firstName + " " + this.userInfo.lastName
    };

    this.appService.editQuestionFunction(data).subscribe((data) => {
      if(data.status === 200) {
        console.log('Question edited successfully!');
        this.toastr.success('Question edited successfully!');

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

  editAppointment() {
    let selectedDoctorObject = this.doctorDetails.find(x => x.userId == this.selectedDoctor);
    let data = {
      id: this.appointmentId,
      title: this.appointmentTitle,
      date: this.appointmentDate,
      doctorId: this.selectedDoctor,
      doctorName: selectedDoctorObject.firstName + " " + selectedDoctorObject.lastName,
      patientName: this.userInfo.firstName + " " + this.userInfo.lastName
    };

    this.appService.editAppointmentFunction(data).subscribe((data) => {
      if(data.status === 200) {
        console.log('Appointment edited successfully!');
        this.toastr.success('Appointment edited successfully!');

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
