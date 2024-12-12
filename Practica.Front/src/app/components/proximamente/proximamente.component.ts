import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SwalMethods } from '../../Swal/SwalMethods';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html',
  styleUrl: './proximamente.component.css'
})
export class ProximamenteComponent extends SwalMethods implements OnInit{
  private _serviceUser=inject(UserService)
  ngOnInit(): void {
  if(this._serviceUser.DateExpired()){
    this._serviceUser.ClearLocal();
    this.modalAcceptRouter("Su Sesión ha caducado", "login");     
  }
}
}
