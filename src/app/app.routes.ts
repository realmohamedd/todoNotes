import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './auth.guard';
import { noauthGuard } from './noauth.guard';

export const routes: Routes = [
    {path:"" , redirectTo:"home", pathMatch:"full"},
    {path:"home", canActivate:[authGuard] ,component:HomeComponent},
    {path:"login", canActivate:[noauthGuard],component:LoginComponent},
    {path:"signup", canActivate:[noauthGuard],component:RegisterComponent},
    {path:"**" , component:NotfoundComponent}
];
