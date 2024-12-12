import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { ProximamenteComponent } from './components/proximamente/proximamente.component';
import { RecoveredComponent } from './components/authentication/recovered/recovered.component';
import { PersonComponent } from './components/person/person.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { invalidLoginGuard } from './guards/invalid-login.guard';
import { validLoginGuard } from './guards/valid-login.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginComponent, canActivate:[invalidLoginGuard]},
  {path:"proximamente", component:ProximamenteComponent, canActivate:[validLoginGuard]},
  {path:"recoveredPassword/:token", component:RecoveredComponent},
  {path:"person", component:PersonComponent, canActivate:[adminGuard]},
  {path:"create", component:CreatePersonComponent, canActivate:[adminGuard]},
  {path:"**", redirectTo:"login", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
