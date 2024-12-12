import { PersonDto } from './../../Models/PersonDto';
import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import Swal from 'sweetalert2';
import { SwalMethods } from '../../Swal/SwalMethods';
import { PersonRequest } from '../../Models/PersonRequest';
import { SearchRequest } from '../../Models/SearchRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SexService } from '../../services/sex.service';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../Models/Rol';
import { Sex } from '../../Models/Sex';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent  extends SwalMethods implements OnInit{
  private _serviceSex=inject(SexService);
  private _services=inject(PersonService);
  private _serviceUser=inject(UserService);
  private _formBuilder=inject(FormBuilder);
  form!:FormGroup;
  personList: PersonDto[]=[];
  request?:SearchRequest;
  sexList:Sex[]=[];
  rolList:Rol[]=[];
  constructor() {
    super();
    this.initForm();
  }
  ngOnInit(): void {   
    console.log(localStorage.getItem(environment.token))

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
        }else{
          this.ModalError("No se cargaron los sexos ni los roles");
        }
      },error:err=>{
        this.ModalError(err.message);
      }
    })
  }
 
  initForm(){
    this.form=this._formBuilder.group(
      {
        search:["", [Validators.required, ]]
      }
    )
  }
  getInvalid(argument:string){
    return this.form.get(argument)?.invalid && this.form.get(argument)?.touched;
  }
  GetPerson(){
    if(this.form.invalid){
      Object.values(this.form.controls).forEach(controls=>controls.markAllAsTouched());
      this.ModalCamposVacios("Se debe llenar el campo de busqueda");
      return;
    }
    this.BuildSearchRequest();
    this._services.GetPerson(this.request!).subscribe({
      next:resp=>{
        if(resp.code==200){
          this.personList=resp.data;
        }else{
          this.ModalCorrecto(resp.message!);
        }
      },error:err=>{
        this.ModalError(this.ChangesMessage(err.error));
      }
    })
  }
  BuildSearchRequest(){
    this.request=new SearchRequest();
    this.request.search="SuperPerson";
    this.request.data=this.form.get("search")?.value;
  }
  UpdatePerson(person:PersonDto){
    let identification=document.getElementById("identification"+person.personaId) as HTMLInputElement;
    let name=document.getElementById("name"+person.personaId) as HTMLInputElement;
    let lastName=document.getElementById("lastName"+person.personaId) as HTMLInputElement;
    let sex=document.getElementById("descriptionSex"+person.personaId) as HTMLInputElement;
    let maritalStatus=document.getElementById("maritalStatus"+person.personaId) as HTMLInputElement;
    let occupation=document.getElementById("occupation"+person.personaId) as HTMLInputElement;
    let phone=document.getElementById("phone"+person.personaId) as HTMLInputElement;
    let nationality=document.getElementById("nationality"+person.personaId) as HTMLInputElement;
    let address=document.getElementById("address"+person.personaId) as HTMLInputElement;
    let dateBirth=document.getElementById("dateBirth"+person.personaId) as HTMLInputElement;    
    if(name.disabled){
      Swal.fire({
        title: "Notificación",
        text:"¿Deseas Modificar este registro?",                    
        icon: "info",
        showCancelButton: false,
        confirmButtonColor :"#00A45A",
        confirmButtonText: "Ok"
      }).then((result) => {
        if(result.isConfirmed){
          identification.disabled=false;
          name.disabled=false;
          lastName.disabled=false;
          maritalStatus.disabled=false;
          occupation.disabled=false;
          phone.disabled=false;
          nationality.disabled=false;
          address.disabled=false;
          dateBirth.disabled=false;          
          sex.disabled=false;          
        }
      })
    }else{
      if(this.validPersonUpdate(person.personaId!)){
        this.ModalError("No puedo actualizar el registro con campos vacios");
        return;
      }
      Swal.fire({
        title: "Notificación",
        text:"¿Deseas Actualizar este registro?",                    
        icon: "info",
        showCancelButton: false,
        confirmButtonColor :"#00A45A",
        confirmButtonText: "Ok"
      }).then((result) => {
        if(result.isConfirmed){
          this.modalLoading();
          this._services.UpdatePerson(person as PersonRequest).subscribe({
            next:()=>{
              identification.disabled=true;
              name.disabled=true;
              lastName.disabled=true;
              maritalStatus.disabled=true;
              occupation.disabled=true;
              phone.disabled=true;
              nationality.disabled=true;
              address.disabled=true;
              dateBirth.disabled=true;  
              sex.disabled=true;  
              this.ModalCorrecto("Registro Actualizado");        
            },error:err=>{
              this.ModalError(this.ChangesMessage(err.error));
            }
          })
        }
      })
    }
  }    
  validPersonUpdate(index:number){
    let invalid=false;
    let identification=document.getElementById("identification"+index) as HTMLInputElement;
    let name=document.getElementById("name"+index) as HTMLInputElement;
    let lastName=document.getElementById("lastName"+index) as HTMLInputElement;
    let maritalStatus=document.getElementById("maritalStatus"+index) as HTMLInputElement;
    let occupation=document.getElementById("occupation"+index) as HTMLInputElement;
    let phone=document.getElementById("phone"+index) as HTMLInputElement;
    let nationality=document.getElementById("nationality"+index) as HTMLInputElement;
    let address=document.getElementById("address"+index) as HTMLInputElement;
    let dateBirth=document.getElementById("dateBirth"+index) as HTMLInputElement;   
    if(identification.value==""|| name.value==""|| lastName.value==""|| maritalStatus.value==""|| occupation.value==""|| phone.value==""|| nationality.value==""|| address.value==""|| dateBirth.value==""){
      invalid=true;
    }
    return invalid;
  }
  DeletePerson(person:PersonDto){
    Swal.fire({
      title: "Notificación",
      text:"¿Deseas eliminar este registro?",                    
      icon: "info",
      showCancelButton: false,
      confirmButtonColor :"#00A45A",
      confirmButtonText: "Ok"
    }).then((result) => {
      if(result.isConfirmed){
        this.modalLoading();
        this._services.DeletePerson(person as PersonRequest).subscribe({
          next:()=>{
            this.ModalCorrecto("Se elimino el registro correctamente");
            this.personList.filter(personExist=>personExist.personaId!=person.personaId)
            this.GetPerson();
          }, error:err=>{
            this.ModalError(this.ChangesMessage(err.error));
          }
        })
      }
    })
  }
}
