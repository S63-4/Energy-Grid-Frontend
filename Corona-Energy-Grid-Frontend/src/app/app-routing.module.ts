import { NgModule, Injectable } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { Authentication } from './app-routing-guards';
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [Authentication]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "myprofile", component: MyprofileComponent, canActivate: [Authentication] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)]  
})
export class AppRoutingModule {
    
}
