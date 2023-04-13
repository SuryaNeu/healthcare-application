import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public appService: AppService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  public firstName: any;
  public lastName: any;
  public mobileNumber: any;
  public email: any;
  public password: any;
  public isDoctor: any = false;
  public userId: any;
  public isEmailDeliverable = true;
  public isLoading: any;
  public confirmPassword: any;
  public firstTrigger = false;

  public goToSignIn: any = () => {

    this.router.navigate(['/login']);

  } // end goToSignIn

  public signupFunction: any = () => {

      if(this.password !== this.confirmPassword) {
        this.toastr.error("Password and confirm Password should be same");
        return;
      }

      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        isDoctor: this.isDoctor,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password
      }

      console.log(data);


      this.toastr.info("Registering...");
      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {
            this.toastr.success("User Created Succesfully!");
            

            this.userId = apiResponse.data.userId;

            console.log(this.userId);

            let data = {
              email: this.email,
              subject: 'Welcome to Medibuddy!',
              text: `
              <div style="text-align: left; margin-left: 10px; font-family: Roboto, sans-serif;">
                <h2>Hey ${this.firstName} ${this.lastName}!</h2>
              </div>
              <div style="text-align: center; font-family: Roboto, sans-serif;">
                <h1>Medibuddy is a place to interact with doctors, create appointments and get your questions answered! </h1>
                <p>Open our website to know more!</p>
              </div>
              `
            }

            this.appService.sendMail(data).subscribe(response => {console.log('Mail sent!')}, err => console.log(err));

            setTimeout(() => {

              this.goToSignIn();

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);
            console.log(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('Technical error occured');
          console.log('Technical error: '+err);

        });

  } // end signupFunction

  verify() {
    this.isLoading = true;
    this.appService.getEmailVerification(this.email).subscribe((response) => {
      this.isLoading = false;
      this.firstTrigger = true;
      if(response?.deliverability === "DELIVERABLE") {
        this.isEmailDeliverable = true;
      } else {
        this.isEmailDeliverable = false;
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    })
  }

}
