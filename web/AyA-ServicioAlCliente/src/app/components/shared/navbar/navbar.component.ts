import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private readonly _userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  
  username: string = '';

  ngOnInit(): void {
  }

  logOut(){
    this._userService.logout();
    this.router.navigate(['/login']);
    this.toastr.success("Hasta luego","Sesión cerrada con éxito");
  }

  isLoggedIn(){
    return this._userService.loggedIn();
  }

  getUsername(){
    return this._userService.getUsername();
  }
}
