import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(public appService: AppService, private Cookie: CookieService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  public signinFunction: any = () => {

      let data = {
        email: this.email,
        password: this.password
      }

      this.toastr.info("Logging in...");
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            this.toastr.success("Logged in Successfully!");
            console.log(apiResponse)

             this.Cookie.set('authtoken', apiResponse.data.authToken);
            
             this.Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            
             this.Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);

             this.Cookie.set('userId', apiResponse.data.userDetails.userId);

             this.Cookie.set('admin', apiResponse.data.userDetails.admin);
           
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
             
             this.appService.sendMessage(true);
              this.router.navigate(['/profile']);
             

          } else {

            this.toastr.error(apiResponse.message);
            console.log(apiResponse.message);
          

          }

        }, (err) => {
          this.toastr.error(err.error.message);
          console.log('Technical error occured ' + JSON.stringify(err));

        });

  } // end signinFunction

}
