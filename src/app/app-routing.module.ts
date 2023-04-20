import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutStyleOneComponent } from './components/pages/about-style-one/about-style-one.component';
import { AuthCheckGuard } from './components/pages/auth-check-guard.service';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ContactStyleOneComponent } from './components/pages/contact-style-one/contact-style-one.component';
import { CreateComponent } from './components/pages/create/create.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeFiveComponent } from './components/pages/home-five/home-five.component';
import { HospitalsComponent } from './components/pages/hospitals/hospitals.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PageGuard } from './components/pages/page-guard.service';
import { PaypalComponent } from './components/pages/paypal/paypal.component';
import { PricingStyleOneComponent } from './components/pages/pricing-style-one/pricing-style-one.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { QuestionsComponent } from './components/pages/questions/questions.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
    {path: '', component: HomeFiveComponent},
    {path: 'home-five', component: HomeFiveComponent},
    {path: 'about-1', component: AboutStyleOneComponent},
    {path: 'pricing-1', component: PricingStyleOneComponent, canActivate: [PageGuard]},
    {path: 'checkout', component: CheckoutComponent, canActivate: [PageGuard]},
    {path: 'login', component: LoginComponent, canActivate:[AuthCheckGuard]},
    {path: 'register', component: RegisterComponent, canActivate:[AuthCheckGuard]},
    {path: 'contact-1', component: ContactStyleOneComponent},
    {path: 'question', component: QuestionsComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [PageGuard]},
    {path: 'profile/create', component: CreateComponent, canActivate: [PageGuard]},
    {path: 'profile/edit/appointment/:id', component: EditComponent, canActivate: [PageGuard]},
    {path: 'profile/edit/question/:id', component: EditComponent, canActivate: [PageGuard]},
    {path: 'hospitals', component: HospitalsComponent},
    {path: 'paypal', component: PaypalComponent},
    // Here add new pages component

    {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }