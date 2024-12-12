import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../../../Models/AuthenticationRequest';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMethods } from '../../../Swal/SwalMethods';
import { RecoveredRequest } from '../../../Models/RecoveredRequest';

@Component({
  selector: 'app-recovered',
  templateUrl: './recovered.component.html',
  styleUrl: './recovered.component.css'
})
export class RecoveredComponent extends SwalMethods implements OnInit {
  private _formBuilder=inject(FormBuilder);
  private _services=inject(UserService);
  private _route=inject(Router);
  private _routerActive=inject(ActivatedRoute);
  form!:FormGroup;
  request?:RecoveredRequest;
  constructor(){
    super()
    this.initForm()
  }
  ngOnInit(): void {
    this.buildRequest();
    this._services.ValidToken(this.request!).subscribe({
      error:err=>{
        this._route.navigateByUrl("login");  
      }
    })
  }
  initForm(){
    this.form=this._formBuilder.group(
      {
        password:["", [Validators.required, ]],
        passwordVerificate:["", [Validators.required, ]]
      }
    )
  }
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  ChangePassword(){
    this.modalLoading();
    if(this.form.invalid){
      Object.values(this.form.controls).forEach(controls=>controls.markAllAsTouched());
      this.ModalError("Hay campos vacios/incorrectos");
      return;
    }   
    const password:string=this.form.get("password")?.value;
    const passwordVerificate:string=this.form.get("passwordVerificate")?.value;     
    if(password != passwordVerificate){
      this.ModalError("Las contraseñas son distintas");
      return;
    }
    this.buildRequest();
    this._services.RestedUser(this.request!).subscribe({
      next:resp=>{        
        this.modalAcceptRouter("Su contraseña ha sido restablecida", "/login");
      },error:err=>{
        this.ModalError(this.ChangesMessage(err.error));
      }
    })    
  }
  buildRequest(){
    this.request=new RecoveredRequest();
    this.request.token=this._routerActive.snapshot.params["token"];
    this.request.password=this.form.get("passwordVerificate")?.value;
  }
}
