import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseHttp } from '../Interfaces/ResponseHttp';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private _http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor() { }
  GetRol():Observable<ResponseHttp>{
    const path=this.baseUrl+environment.GetRol;
    return this._http.get(path);
  }
}
