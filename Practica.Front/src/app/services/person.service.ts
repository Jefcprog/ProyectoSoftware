import { PersonRequest } from './../Models/PersonRequest';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseHttp } from '../Interfaces/ResponseHttp';
import { SearchRequest } from '../Models/SearchRequest';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private _http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor() { }
  GetPerson(request:SearchRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.GetPerson;
    return this._http.post(path,request);
  }
  PostPerson(request:PersonRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.PostPerson;
    return this._http.post(path,request);
  }
  UpdatePerson(request:PersonRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.UpdatePerson;
    return this._http.post(path,request);
  }
  DeletePerson(request:PersonRequest):Observable<ResponseHttp>{
    const path=this.baseUrl+environment.DeletePerson;
    return this._http.post(path,request);
  }
}
