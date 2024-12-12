import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { SwalMethods } from '../../../Swal/SwalMethods';
import { UserService } from '../../../services/user.service';
import { AuthenticationRequest } from '../../../Models/AuthenticationRequest';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends SwalMethods {
  private _formBuilder=inject(FormBuilder);
  private _services=inject(UserService);
  private _route=inject(Router);
  form!:FormGroup;
  request?:AuthenticationRequest;
  constructor(){
    super()
    this.initForm()
  }
  initForm(){
    this.form=this._formBuilder.group(
      {
        email:["", [Validators.required,Validators.pattern(environment.expresionEmail) ]],
        password:["", [Validators.required, ]]
      }
    )
  }
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  Login(){
    this.modalLoading();
    if(this.form.invalid){
      Object.values(this.form.controls).forEach(controls=>controls.markAllAsTouched());
      this.ModalError("Hay campos vacios/incorrectos");
      return;
    }
    this.buildRequest();
    this._services.GetUser(this.request!).subscribe({
      next:resp=>{
        Swal.close();
        this._services.CreateLocal(resp.data);
          this._route.navigateByUrl("person");
      },error:err=>{
        this.ModalError(this.ChangesMessage(err.error));
      }
    })    
  }
  buildRequest(){
    this.request=new AuthenticationRequest();
    this.request.email=this.form.get("email")?.value;
    this.request.password=this.form.get("password")?.value;
  }
}
