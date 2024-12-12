import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private _service=inject(UserService);
  ClearLocal(){
    this._service.ClearLocal();
  }
}
