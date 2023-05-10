import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-medication-reminder',
  templateUrl: './medication-reminder.component.html',
  styleUrls: ['./medication-reminder.component.css']
})
export class MedicationReminderComponent {
  userProfile: any;
  role_id: any;
  public showmenu: boolean = false;
  public profileTitle: string = 'medication';

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService) { };


  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        console.log('response', response);

        this.userProfile = response.profile;

        console.log('userProfile', this.userProfile.sosContact);

        this.role_id = this.userProfile.role_id;
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    );
  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
  }

  changeProfileTitle(title: string) {
    this.profileTitle = title;
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
