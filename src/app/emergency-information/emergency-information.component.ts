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
  public role_id: any;
  public showModal: boolean = false;

  public userProfile: any = {
    role_id: '',
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
  sosContactPayload: any = {
    firstName:"",
    lastName :'',
    username: '',
    phone:'',
    email: '',
    sosContact: {
      contact_name: '',
      contact_number: ''
    }
  };

  public showmenu: boolean = false;

  public userSosContacts: any;
  singleSosContact: any;

  constructor(private router: Router, private service: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      data => {
        const response = data;
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
        this.userProfile.medical_note = response.profile.medical_note;  
        this.userProfile.role_id = response.profile.role_id;  
        // this.userProfile.sosContact = response.profile.sosContact;

        // this.userSosContacts = response.profile.sosContact;

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
    
    this.service.getSosContact().subscribe(
      data => {
        const response = data;

        if (response.sosContacts !== null) {
          this.userSosContacts = response.sosContacts;
        }
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

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
    this.service.UpdateProfile(this.userProfile).subscribe(
      data => {
        const response = data;
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
    this.showModal = !this.showModal;
  }

  addSosContact() {
    this.loading = true;
    if (this.sosContactPayload.sosContact.contact_name == null || this.sosContactPayload.sosContact.contact_number == null) {
      this.loading = false;
      this._snackBar.open("All the fields must be filled", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else {
      this.sosContactPayload.username = this.userProfile.username;
      this.sosContactPayload.email = this.userProfile.email;
      this.sosContactPayload.firstName=this.userProfile.firstName
      this.sosContactPayload.lastName=this.userProfile.lastName
      
      this.sosContactPayload.phone=this.userProfile.phone
      
      this.service.createSosContact(this.sosContactPayload).subscribe(
        data => {
          const response = data;
          this.loading = false;
          this.showModal = false;
          this._snackBar.open("Sos contact added successfully", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          this.ngOnInit();

          this.sosContactPayload.sosContact.contact_name = "";
          this.sosContactPayload.sosContact.contact_number = "";
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
        });

    }
  }

  getSingleSosContact(id: any) {
    this.service.getSingleSosContact(id).subscribe(
      data => {
        const response = data;
        this.singleSosContact = response;
        
        this.sosContactPayload.sosContact.contact_name = this.singleSosContact.sosContact.contact_name;
        this.sosContactPayload.sosContact.contact_number = this.singleSosContact.sosContact.contact_number;
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error;
        console.log('errorMessage', this.errorMessage);
      })
  }

  updateSosContact() {
    this.service.updateSosContact(this.sosContactPayload, this.singleSosContact.sosContact._id).subscribe(
      data => {
        const response = data;
        this.loading = false;
        this._snackBar.open("Updated successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });

        this.ngOnInit();

          this.sosContactPayload.sosContact.contact_name = "";
          this.sosContactPayload.sosContact.contact_number = "";
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
      })
  }

  deleteSosContact(id: any) {
    this.service.deleteSosContact(id).subscribe(
      data => {
        const response = data;
        this.loading = false;
        this._snackBar.open("Sos contact deleted successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });

        this.ngOnInit();

        this.sosContactPayload.sosContact.contact_name = '';
        this.sosContactPayload.sosContact.contact_number = '';
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
      })
  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
  }

}
