import { UserRequest } from './../Models/UserRequest';
import { AuthenticationRequest } from './../Models/AuthenticationRequest';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseHttp } from '../Interfaces/ResponseHttp';
import { EmailRequest } from '../Models/EmailRequest.';
import { RecoveredRequest } from '../Models/RecoveredRequest';
import { TokenJWT } from '../Models/TokenJWT';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor() { }
  GetUser(request:AuthenticationRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.GetUser;
    return this._http.post(path,request);
  }
  RestedUser(request:RecoveredRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.RestedUser;
    return this._http.post(path,request);
  }
  GeneratedToken(request:EmailRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.GeneratedToken;
    return this._http.post(path,request);
  }
  ValidToken(request:RecoveredRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.ValidToken;
    return this._http.post(path,request);
  }
  UpdateUser(request:UserRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.UpdateUser;
    return this._http.post(path,request);
  }
  CreateLocal(token:TokenJWT){
    localStorage.setItem("user",token.user!);
    localStorage.setItem("rol",token.rol!.toString());
    const dateObject = new Date(token.dateExpirated!); 
    localStorage.setItem("dateExpired", dateObject.toISOString());
    localStorage.setItem(environment.token,token.token!);
  }
  ClearLocal(){
    localStorage.clear();
  }
  Rol(){
    let admin=false;
    const rol=localStorage.getItem("rol");
    if(rol == "1"){
      admin=true;
    }
    return admin;
  }
  DateExpired(){
    let valid=false;
    const dateLocal=localStorage.getItem("dateExpired");
    if(!dateLocal){
        return valid;
    }
    const date=new Date(dateLocal);
    if(date<new Date()){
      valid=true;
    }
    return valid;
  }
}
