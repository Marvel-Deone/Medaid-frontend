import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public profileTitle: string = 'update_profile';
  public loading: any = false;
  public errorMessage: any;

  public userProfile = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    middleName: '',
    dob: '',
    blood_group: '',
    genotype: '',
    current_medical_condition: '',
    past_medical_condition: '',
    sosContact: []
  };
  public showmenu: boolean = false;
  role_id: any;
  user_fullname: any;


  constructor(private router: Router, private service: UserService, private _snackBar: MatSnackBar) { };

  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        console.log('response: ', response);

        this.userProfile.firstName = response.profile.firstName;
        this.userProfile.lastName = response.profile.lastName;
        this.userProfile.middleName = response.profile.middleName;
        this.userProfile.username = response.profile.username;
        this.userProfile.gender = response.profile.gender;
        this.userProfile.dob = response.profile.dob;
        this.userProfile.phone = response.profile.phone;
        this.userProfile.email = response.profile.email;
        this.userProfile.address = response.profile.address;
        this.userProfile.blood_group = response.profile.blood_group;
        this.userProfile.genotype = response.profile.genotype;
        this.userProfile.current_medical_condition = response.profile.current_medical_condition;
        this.userProfile.past_medical_condition = response.profile.past_medical_condition;
        this.userProfile.sosContact = response.profile.sosContact;
        this.role_id = response.profile.role_id;
        // this.role_id = 1;

        // this.user_fullname = response.profile.firstName + ' ' + response.profile.lastName;
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
        if (errorResponse.error.message == 'jwt expired') {
          localStorage.removeItem('token');
          this.router.navigate(['/sign-in']);
        }
      }
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  changeProfileTitle(title: string) {
    this.profileTitle = title;
  }

  updateProfile() {
    this.loading = true;
    console.log('userProfile', this.userProfile);
    this.service.UpdateProfile(this.userProfile).subscribe(
      data => {
        const response = data;
        this.loading = false;
        this._snackBar.open("Profile updated successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        this.ngOnInit();
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error.message;
        console.log('errorMessage', this.errorMessage);

        this._snackBar.open("Something went wrong, pls try again", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      }
    )
  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
  }

}
