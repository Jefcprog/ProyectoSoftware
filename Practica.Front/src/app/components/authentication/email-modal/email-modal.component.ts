import { Component, inject } from '@angular/core';
import { AuthenticationRequest } from '../../../Models/AuthenticationRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment.development';
import { SwalMethods } from '../../../Swal/SwalMethods';
import Swal from 'sweetalert2';
import { EmailRequest } from '../../../Models/EmailRequest.';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.css'
})
export class EmailModalComponent  extends SwalMethods {
  private _formBuilder=inject(FormBuilder);
  private _services=inject(UserService);
  private _route=inject(Router);
  form!:FormGroup;
  request?:EmailRequest;
  constructor(){
    super()
    this.initForm()
  }
  initForm(){
    this.form=this._formBuilder.group(
      {
        email:["", [Validators.required,Validators.pattern(environment.expresionEmail) ]],
      }
    )
  }
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  GeneratedToken(){
    this.modalLoading()
    if(this.form.invalid){
      Object.values(this.form.controls).forEach(controls=>controls.markAllAsTouched());
      this.ModalError("Hay un campo vacio/incorrecto");
      return;
    }
    this.BuildRequest();
    this._services.GeneratedToken(this.request!).subscribe({
      next:resp=>{
          this.modalAcceptReload("Revise su correo para el cambio de contraseña")
      },error:err=>{
        this.ModalError(this.ChangesMessage(err.error));
      }
    })  
  }
  BuildRequest(){
    this.request=new EmailRequest();
    this.request.to=this.form.get("email")?.value;
    this.request.params={
      "link":environment.urlFront,
      "TextoEmail":"Cambiar Contraseña"
    };
    this.request.subject="Recuperar Contraseña";
    this.request.template=environment.documentSendLink
  }
} 
