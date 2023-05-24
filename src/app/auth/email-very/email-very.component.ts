import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email-very',
  templateUrl: './email-very.component.html',
  styleUrls: ['./email-very.component.css'],
})
export class EmailVeryComponent {
  public userPin: any = '';
  public response: any;
  public userDetail: any;
  constructor(
    public service: UserService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    const userDetailString = sessionStorage.getItem('med_aid');
    if (userDetailString) {
      this.userDetail = JSON.parse(userDetailString);
      console.log(this.userDetail);
    } else {
      console.log('User detail not found in sessionStorage');
    }
  }

  verifyEmail() {
    if (this.userPin == '') {
      this._snackBar.open('Kindly input your Pin ', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else if (this.userPin != parseInt(this.userDetail.pin)) {
      this._snackBar.open('Invalid pin', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else {
      console.log('correct ');
      this.service.Register(this.userDetail).subscribe((item: any) => {
        const userResp = item;
        console.log();
        
        if (userResp.success == true) {
          this._snackBar.open(userResp.message, 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          sessionStorage.removeItem('med-email');
          this.router.navigate(['/sign-in']);
        } else if (userResp.success == false) {
          this._snackBar.open(userResp.message, 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }
      }),
        (error: any) => {
          this._snackBar.open('Internal Server Error', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        };
    }
  }
}
