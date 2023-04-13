import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../pages/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedin = false;

  constructor(private Cookie: CookieService, private appService: AppService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.Cookie.get('authtoken') === undefined || this.Cookie.get('authtoken') === '' || this.Cookie.get('authtoken') === null) {
      this.isLoggedin = false;
    } else {
      this.isLoggedin = true;
    }
    this.appService.onMessage().subscribe((isLoggedin) => {
      this.isLoggedin = isLoggedin;
    });
  }

  public logOut: any = () => {

    this.appService.logout()
      .subscribe((apiResponse) => {
  
        if (apiResponse.status === 200) {
          console.log("logout called")
          this.Cookie.delete('authtoken');
  
          this.Cookie.delete('receiverId');
  
          this.Cookie.delete('receiverName');

          this.Cookie.delete('userId');

          this.Cookie.delete('admin');
  
          this.isLoggedin = false;
          this.router.navigate(['/']);
  
        } else {
          this.toastr.error(apiResponse.message)
  
        } // end condition
  
      }, (err) => {
        this.toastr.error('some error occured')
  
  
      });
  
  }

}
