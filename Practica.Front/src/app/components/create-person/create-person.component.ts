import { Component, inject, OnInit } from '@angular/core';
import { SexService } from '../../services/sex.service';
import { RolService } from '../../services/rol.service';
import { Sex } from '../../Models/Sex';
import { Rol } from '../../Models/Rol';
import { SwalMethods } from '../../Swal/SwalMethods';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { PersonRequest } from '../../Models/PersonRequest';
import { User } from '../../Models/User';
import { PersonService } from '../../services/person.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.css'
})
export class CreatePersonComponent extends SwalMethods implements OnInit{
  private _serviceSex=inject(SexService);
  private _serviceRol=inject(RolService);
  private _servicePerson=inject(PersonService);
  private _serviceUser=inject(UserService);
  private _formBuilder=inject(FormBuilder);
  form!:FormGroup;
  sexList:Sex[]=[];
  rolList:Rol[]=[];
  request?:PersonRequest;
  user?:User;
  username:string=""
  constructor(){
    super();
    this.initForm();
  }
  ngOnInit(): void {   
    if(this._serviceUser.DateExpired()){
      this._serviceUser.ClearLocal();
      this.modalAcceptRouter("Su Sesión ha caducado", "login");     
    }
    this.modalLoading();
    this.GetSex(); 
    Swal.close();
  }
  GetSex(){
    this._serviceSex.GetSex().subscribe({
      next:resp=>{
        if(resp.code==200){
          this.sexList=resp.data;
          this.GetRol(); 
        }else{
          this.ModalError("No se cargaron los sexos ni los roles");
        }
      },error:err=>{
        this.ModalError(err.message);
      }
    })
  }
  GetRol(){
    this._serviceRol.GetRol().subscribe({
      next:resp=>{
        if(resp.code==200){
          this.rolList=resp.data;
        }else{
          this.ModalError("No se cargaron los roles");
        }
      },error:err=>{
        this.ModalError(err.message);
      }
    })
  }
  initForm(){
    this.form=this._formBuilder.group(
      {
        identification:["",[Validators.required]],
        name:["",[Validators.required]],
        lastName:["",[Validators.required]],
        address:["",[Validators.required]],
        phone:["",[Validators.required]],
        dateBirth:["",[Validators.required]],
        sexId:["",[Validators.required]],
        nationality:["",[Validators.required]],
        maritalStatus:["",[Validators.required]],
        occupation:["",[Validators.required]],
        email:["", [Validators.required,Validators.pattern(environment.expresionEmail) ]],        
        nameUser:[this.username, [Validators.required,]],
        rol:["", [Validators.required,]],
        password:["proyectoSoftware", [Validators.required,]],
      }
    )
    this.form.get('password')?.disable();
    this.form.get('nameUser')?.disable();
  }
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  GeneratedUser(){
    const identificacion=document.getElementById("identificationId") as HTMLInputElement;
    const name=document.getElementById("nameId") as HTMLInputElement;
    const lastName=document.getElementById("lastNameId") as HTMLInputElement;
   if((identificacion && name && lastName)!=null ){
    let nameUser:string="";
    let lastNameUser:string="";
    let identificationUser:string="";
    if(name.value.length>3 && lastName.value.length>3 ){
      nameUser=name.value.slice(0,3);      
      lastNameUser=lastName.value.slice(0,3);
    }
    if(identificacion.value.length==10){
      identificationUser= identificacion.value.slice(0,3);
    }
    this.username=`${nameUser}${lastNameUser}${identificationUser}`
    this.form.get("nameUser")?.setValue(this.username);
  }
  }
  PostPerson(){
    if(this.form.invalid){
      this.ModalError("Hay campos vacios/incorrectos");
      Object.values(this.form.controls).forEach(controls=>controls.markAllAsTouched());
      return;
    }
    this.BuildPersonRequest();
    if(!this.validadorDeCedula(this.request!.identification)){
      this.ModalError("Identificacion invalida");
      return;
    };
    this._servicePerson.PostPerson(this.request!).subscribe({
      next:()=>{
        this.modalAcceptReload("Persona Registrada con exito");
      },error:err=>{
        this.ModalError(this.ChangesMessage(err.error));
      }
    })
  }
  BuildPersonRequest(){
    this.request=new PersonRequest();
    this.request.address=this.form.get("address")?.value;
    this.request.name=this.form.get("name")?.value;
    this.request.lastName=this.form.get("lastName")?.value;
    this.request.phone=this.form.get("phone")?.value;
    this.request.dateBirth=this.form.get("dateBirth")?.value;
    this.request.sexId=this.form.get("sexId")?.value;
    this.request.nationality=this.form.get("nationality")?.value;
    this.request.maritalStatus=this.form.get("maritalStatus")?.value;
    this.request.occupation=this.form.get("occupation")?.value;
    this.request.identification=this.form.get("identification")?.value;    
    this.BuildUser();
    this.request.user=this.user;    
  }
  BuildUser(){
    this.user=new User();
    this.user.nameUser=this.form.get("nameUser")?.value;
    this.user.password=this.form.get("password")?.value;
    this.user.email=this.form.get("email")?.value;    
    this.user.rolId=this.form.get("rol")?.value
  }
  validadorDeCedula(cedula: string) {
    let cedulaCorrecta = false;
    
    if (cedula.length == 10)
    {    
        let tercerDigito = parseInt(cedula.substring(2, 3));
        if (tercerDigito < 6) {
            let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
            let verificador = parseInt(cedula.substring(9, 10));
            let suma:number = 0;
            let digito:number = 0;
            for (let i = 0; i < (cedula.length - 1); i++) {
                digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
                suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
           
            }              
            suma= Math.round(suma);            
  
            if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                cedulaCorrecta = true;
            } else if ((10 - (Math.round(suma % 10))) == verificador) {
                cedulaCorrecta = true;
            } else {
                cedulaCorrecta = false;
            }
        } else {
            cedulaCorrecta = false;
        }
    } else {
        cedulaCorrecta = false;
    }
      return cedulaCorrecta; 
  }  
}
