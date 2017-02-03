import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { materialize } from 'materialize-css';
//import { MaterializeModule } from 'angular2-materialize';
import { AuthenticationService } from './shared/authentication.service';
import { UserService } from './shared/user.service';
import { AppRoutingModule, routingComponents } from './app.routing';
import { AppComponent } from './app.component';
import { TopFiveUsersComponent } from './top-five-users/top-five-users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    TopFiveUsersComponent,
    NavbarComponent,
    routingComponents,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AboutComponent,
    ProfileComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule/*,
    MaterializeModule*/
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
