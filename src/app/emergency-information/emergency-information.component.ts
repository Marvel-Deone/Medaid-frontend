import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-emergency-information',
  templateUrl: './emergency-information.component.html',
  styleUrls: ['./emergency-information.component.css']
})
export class EmergencyInformationComponent {
  public profileTitle: string = 'medical_info';
  public loading = false;
  public errorMessage: any;
  contact_owner: any;
  contact_no: any;
  public role_id: any;

  public userProfile: any = {
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
    medical_note: '',
    sosContact: []
  };

  sosContactInfo: Object[] = [];

  public showmenu: boolean = false;
  showModal: boolean = false;

  public userSosContacts: any;

  constructor(private router: Router, private service: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        console.log('response ', response);
        this.role_id = response.profile.role_id;

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
        this.userProfile.sosContact = response.profile.sosContact;

        this.userSosContacts = response.profile.sosContact;

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

  editModalStatus() {
    this.showModal = true;
  }

  updateSosContact() {
    this.loading = true;
    if (this.contact_owner == null || this.contact_no == null) {
      this.loading = false;
      this._snackBar.open("All the fields must be filled", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else {
      console.log('userProfileContact', this.userProfile.sosContact);

      this.sosContactInfo.push(...this.userProfile.sosContact, {
        contactName: this.contact_owner,
        contactNumber: this.contact_no
      });
      this.userProfile.sosContact = this.sosContactInfo;



      this.service.UpdateProfile(this.userProfile).subscribe(
        data => {
          this.showModal = false;
          const response = data;
          console.log('response', response);

          this.loading = false;
          this._snackBar.open("Emergency Info updated successfully", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });

          this.ngOnInit();
          this.contact_owner = '';
          this.contact_no = '';
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

      console.log('userProfile', this.userProfile);

    }

  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
  }

}
