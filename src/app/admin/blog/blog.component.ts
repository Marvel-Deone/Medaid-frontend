import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  public userProfile: any;
  public role_id: any;
  public showmenu: boolean = false;


  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService) {}
  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data=> {
        const response = data;
        this.userProfile = response.profile;
        this.role_id = this.userProfile.role_id;
        console.log('role_id: ' + this.role_id);
        
      }, 
      error=> {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
        
      }
    )

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

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }

}
