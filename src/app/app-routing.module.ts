import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { Register2Component } from './register2/register2.component';
import { AuthGuard } from './models/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full'},
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'Home', component: HomeComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Register2', component: Register2Component },
  { path: 'Login', component: LoginComponent},
  { path: 'Group', component: GroupComponent},
  { path: 'Chat', component: ChatComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
