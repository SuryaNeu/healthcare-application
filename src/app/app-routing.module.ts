import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutStyleOneComponent } from './components/pages/about-style-one/about-style-one.component';
import { AboutStyleTwoComponent } from './components/pages/about-style-two/about-style-two.component';
import { AuthCheckGuard } from './components/pages/auth-check-guard.service';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogFourColumnComponent } from './components/pages/blog-four-column/blog-four-column.component';
import { BlogThreeColumnComponent } from './components/pages/blog-three-column/blog-three-column.component';
import { BlogTwoColumnComponent } from './components/pages/blog-two-column/blog-two-column.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ContactStyleOneComponent } from './components/pages/contact-style-one/contact-style-one.component';
import { ContactStyleTwoComponent } from './components/pages/contact-style-two/contact-style-two.component';
import { CreateComponent } from './components/pages/create/create.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { FeaturesStyleOneComponent } from './components/pages/features-style-one/features-style-one.component';
import { FeaturesStyleTwoComponent } from './components/pages/features-style-two/features-style-two.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { HomeFiveComponent } from './components/pages/home-five/home-five.component';
import { HomeFourComponent } from './components/pages/home-four/home-four.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HospitalsComponent } from './components/pages/hospitals/hospitals.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PageGuard } from './components/pages/page-guard.service';
import { PortfolioDetailsComponent } from './components/pages/portfolio-details/portfolio-details.component';
import { PortfolioFourColumnComponent } from './components/pages/portfolio-four-column/portfolio-four-column.component';
import { PortfolioThreeColumnComponent } from './components/pages/portfolio-three-column/portfolio-three-column.component';
import { PortfolioTwoColumnComponent } from './components/pages/portfolio-two-column/portfolio-two-column.component';
import { PricingStyleOneComponent } from './components/pages/pricing-style-one/pricing-style-one.component';
import { PricingStyleTwoComponent } from './components/pages/pricing-style-two/pricing-style-two.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ProductsDetailsComponent } from './components/pages/products-details/products-details.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { QuestionsComponent } from './components/pages/questions/questions.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { ServicesStyleOneComponent } from './components/pages/services-style-one/services-style-one.component';
import { ServicesStyleThreeComponent } from './components/pages/services-style-three/services-style-three.component';
import { ServicesStyleTwoComponent } from './components/pages/services-style-two/services-style-two.component';
import { ShopListOneComponent } from './components/pages/shop-list-one/shop-list-one.component';
import { ShopListTwoComponent } from './components/pages/shop-list-two/shop-list-two.component';
import { TeamStyleOneComponent } from './components/pages/team-style-one/team-style-one.component';
import { TeamStyleTwoComponent } from './components/pages/team-style-two/team-style-two.component';
import { TermsOfServiceComponent } from './components/pages/terms-of-service/terms-of-service.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';

const routes: Routes = [
    {path: '', component: HomeFiveComponent},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'home-four', component: HomeFourComponent},
    {path: 'home-five', component: HomeFiveComponent},
    {path: 'about-1', component: AboutStyleOneComponent},
    {path: 'about-2', component: AboutStyleTwoComponent},
    {path: 'team-1', component: TeamStyleOneComponent},
    {path: 'team-2', component: TeamStyleTwoComponent},
    {path: 'pricing-1', component: PricingStyleOneComponent},
    {path: 'pricing-2', component: PricingStyleTwoComponent},
    {path: 'features-1', component: FeaturesStyleOneComponent},
    {path: 'features-2', component: FeaturesStyleTwoComponent},
    {path: 'services-1', component: ServicesStyleOneComponent},
    {path: 'services-2', component: ServicesStyleTwoComponent},
    {path: 'services-3', component: ServicesStyleThreeComponent},
    {path: 'services-details', component: ServicesDetailsComponent},
    {path: 'portfolio-1', component: PortfolioTwoColumnComponent},
    {path: 'portfolio-2', component: PortfolioThreeColumnComponent},
    {path: 'portfolio-3', component: PortfolioFourColumnComponent},
    {path: 'portfolio-details', component: PortfolioDetailsComponent},
    {path: 'blog-1', component: BlogTwoColumnComponent},
    {path: 'blog-2', component: BlogThreeColumnComponent},
    {path: 'blog-3', component: BlogFourColumnComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'testimonials', component: TestimonialsComponent},
    {path: 'shop-1', component: ShopListOneComponent},
    {path: 'shop-2', component: ShopListTwoComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'products-details', component: ProductsDetailsComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'login', component: LoginComponent, canActivate:[AuthCheckGuard]},
    {path: 'register', component: RegisterComponent, canActivate:[AuthCheckGuard]},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'terms-of-service', component: TermsOfServiceComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'contact-1', component: ContactStyleOneComponent},
    {path: 'contact-2', component: ContactStyleTwoComponent},
    {path: 'question', component: QuestionsComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [PageGuard]},
    {path: 'profile/create', component: CreateComponent, canActivate: [PageGuard]},
    {path: 'profile/edit/appointment/:id', component: EditComponent, canActivate: [PageGuard]},
    {path: 'profile/edit/question/:id', component: EditComponent, canActivate: [PageGuard]},
    {path: 'hospitals', component: HospitalsComponent},
    // Here add new pages component

    {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }