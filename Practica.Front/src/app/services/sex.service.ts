import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ResponseHttp } from '../Interfaces/ResponseHttp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SexService {

  private _http=inject(HttpClient);
  private baseUrl=environment.baseUrl;
  constructor() { }
  GetSex():Observable<ResponseHttp>{
    const path=this.baseUrl+environment.GetSex;
    return this._http.get(path);
  }}
