import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.css']
})
export class SosComponent {
  public role_id: any;
  public showmenu: boolean = false;
  public userProfile:any;

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService) { }
  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data=> {
        const response = data;
        console.log('response', response);
        this.userProfile = response.profile;
        this.role_id = this.userProfile.role_id;
      }, 
      error=> {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
      }
    )
  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }

  logout() {
    localStorage.removeItem('token');
    this._snackBar.open("Logout Successful", "OK", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    this.router.navigate(['/sign-in']);
  }
}
