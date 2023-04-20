import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeFiveComponent } from './components/pages/home-five/home-five.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AboutStyleOneComponent } from './components/pages/about-style-one/about-style-one.component';
import { PricingStyleOneComponent } from './components/pages/pricing-style-one/pricing-style-one.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ContactStyleOneComponent } from './components/pages/contact-style-one/contact-style-one.component';
import { QuestionsComponent } from './components/pages/questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CreateComponent } from './components/pages/create/create.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { RouterModule } from '@angular/router';
import { HospitalsComponent } from './components/pages/hospitals/hospitals.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './components/pages/paypal/paypal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeFiveComponent,
    PreloaderComponent,
    NavbarComponent,
    FooterComponent,
    AboutStyleOneComponent,
    PricingStyleOneComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    ContactStyleOneComponent,
    QuestionsComponent,
    ProfileComponent,
    CreateComponent,
    EditComponent,
    HospitalsComponent,
    PaypalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPayPalModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
