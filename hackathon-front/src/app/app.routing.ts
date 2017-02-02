import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopFiveUsersComponent } from './top-five-users/top-five-users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', pathMatch: 'full', redirectTo: '/'},
    { path: 'about', component: AboutComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [TopFiveUsersComponent];