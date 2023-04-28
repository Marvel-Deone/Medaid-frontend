import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emergency-information',
  templateUrl: './emergency-information.component.html',
  styleUrls: ['./emergency-information.component.css']
})
export class EmergencyInformationComponent {
  public profileTitle: string = 'medical_info';
  public loading = false;
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
    allergies: '',
    medication: '',
    medical_note: ''
  };

  public showmenu: boolean = false;

  constructor(private router: Router,  private service: UserService,  private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      data=> {
        const response = data;
        console.log('response: ' + response);
        
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
        this.userProfile.allergies = response.profile.allergies;
        this.userProfile.medication = response.profile.medication;
        this.userProfile.medication = response.profile.medication;
      }, 
      error=> {
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
        console.log('response', response);
        
        this.loading = false;
             this._snackBar.open("Emergency Info updated successfully", "OK", {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['green-snackbar', 'login-snackbar'],
          });
      },
      error => {
        this.loading = false;
        this.errorMessage = error.message;
             this._snackBar.open(this.errorMessage, "OK", {
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
    // alert(this.showmenu);
  }
  
}
