import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { HomeFourComponent } from './components/pages/home-four/home-four.component';
import { HomeFiveComponent } from './components/pages/home-five/home-five.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AboutStyleOneComponent } from './components/pages/about-style-one/about-style-one.component';
import { AboutStyleTwoComponent } from './components/pages/about-style-two/about-style-two.component';
import { TeamStyleTwoComponent } from './components/pages/team-style-two/team-style-two.component';
import { TeamStyleOneComponent } from './components/pages/team-style-one/team-style-one.component';
import { PricingStyleOneComponent } from './components/pages/pricing-style-one/pricing-style-one.component';
import { PricingStyleTwoComponent } from './components/pages/pricing-style-two/pricing-style-two.component';
import { ShopListOneComponent } from './components/pages/shop-list-one/shop-list-one.component';
import { ShopListTwoComponent } from './components/pages/shop-list-two/shop-list-two.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { FeaturesStyleOneComponent } from './components/pages/features-style-one/features-style-one.component';
import { FeaturesStyleTwoComponent } from './components/pages/features-style-two/features-style-two.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { TermsOfServiceComponent } from './components/pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ServicesStyleOneComponent } from './components/pages/services-style-one/services-style-one.component';
import { ServicesStyleTwoComponent } from './components/pages/services-style-two/services-style-two.component';
import { ServicesStyleThreeComponent } from './components/pages/services-style-three/services-style-three.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { PortfolioDetailsComponent } from './components/pages/portfolio-details/portfolio-details.component';
import { PortfolioTwoColumnComponent } from './components/pages/portfolio-two-column/portfolio-two-column.component';
import { PortfolioThreeColumnComponent } from './components/pages/portfolio-three-column/portfolio-three-column.component';
import { PortfolioFourColumnComponent } from './components/pages/portfolio-four-column/portfolio-four-column.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogTwoColumnComponent } from './components/pages/blog-two-column/blog-two-column.component';
import { BlogThreeColumnComponent } from './components/pages/blog-three-column/blog-three-column.component';
import { BlogFourColumnComponent } from './components/pages/blog-four-column/blog-four-column.component';
import { ContactStyleOneComponent } from './components/pages/contact-style-one/contact-style-one.component';
import { ContactStyleTwoComponent } from './components/pages/contact-style-two/contact-style-two.component';
import { QuestionsComponent } from './components/pages/questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CreateComponent } from './components/pages/create/create.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { RouterModule } from '@angular/router';
import { HospitalsComponent } from './components/pages/hospitals/hospitals.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    HomeFourComponent,
    HomeFiveComponent,
    PreloaderComponent,
    NavbarComponent,
    FooterComponent,
    AboutStyleOneComponent,
    AboutStyleTwoComponent,
    TeamStyleTwoComponent,
    TeamStyleOneComponent,
    PricingStyleOneComponent,
    PricingStyleTwoComponent,
    ShopListOneComponent,
    ShopListTwoComponent,
    CartComponent,
    CheckoutComponent,
    ProductsDetailsComponent,
    FeaturesStyleOneComponent,
    FeaturesStyleTwoComponent,
    TestimonialsComponent,
    FaqComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ErrorComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    ServicesStyleOneComponent,
    ServicesStyleTwoComponent,
    ServicesStyleThreeComponent,
    ServicesDetailsComponent,
    PortfolioDetailsComponent,
    PortfolioTwoColumnComponent,
    PortfolioThreeColumnComponent,
    PortfolioFourColumnComponent,
    BlogDetailsComponent,
    BlogTwoColumnComponent,
    BlogThreeColumnComponent,
    BlogFourColumnComponent,
    ContactStyleOneComponent,
    ContactStyleTwoComponent,
    QuestionsComponent,
    ProfileComponent,
    CreateComponent,
    EditComponent,
    HospitalsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
