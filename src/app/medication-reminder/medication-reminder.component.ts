import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MedicationReminderService } from '../services/medicationReminder/medication-reminder.service';
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

  public medicationPayload: any = {
    username: '',
    medication: {
      drug_name: '',
      dose: '',
      time: '',
      daily: '',
    }
  }

  public reminderPayload: any = {
    username: '',
    reminder: {
      title: '',
      time: ''
    }
  }

  loading: boolean = false;
  errorMessage: any;
  medications: any;
  reminders: any;

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private medicationReminderService: MedicationReminderService) { };


  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        console.log('response', response);

        this.userProfile = response.profile;

        console.log('userProfile', this.userProfile);

        this.role_id = this.userProfile.role_id;
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    );

    this.medicationReminderService.getMedication().subscribe(
      data => {
        const response = data;
        console.log('myRes', response);

        if (response.medications !== null) {
          this.medications = response.medications;
          console.log('medications', response);
        }
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    )

    this.medicationReminderService.getReminder().subscribe(
      data => {
        const response = data;
        console.log('myRes', response);

        if (response.reminder !== null) {
          this.reminders = response.reminders;
          console.log('medications', response);
        }
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    )
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

  saveMedication() {
    console.log('MedicationPayload', this.medicationPayload);

    if (this.medicationPayload.medication.drug_name == null || this.medicationPayload.medication.dose == null || this.medicationPayload.medication.time == null || this.medicationPayload.medication.daily == null) {
      this.loading = false;
      this._snackBar.open("All the fields must be filled", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else {
      this.medicationPayload.username = this.userProfile.username;

      this.medicationReminderService.createMedication(this.medicationPayload).subscribe(
        data => {
          const response = data;
          this.loading = false;
          this._snackBar.open("Medication added successfully", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });

          this.ngOnInit();

          this.medicationPayload.drug_name = '';
          this.medicationPayload.dose = '',
            this.medicationPayload.time = '';
          this.medicationPayload.daily = '';
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
  }

  saveReminder() {
    console.log('MedicationPayload', this.medicationPayload);

    if (this.reminderPayload.reminder.title == null || this.reminderPayload.reminder.time == null) {
      this.loading = false;
      this._snackBar.open("All the fields must be filled", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else {
      this.reminderPayload.username = this.userProfile.username;

      this.medicationReminderService.createReminder(this.reminderPayload).subscribe(
        data => {
          const response = data;
          this.loading = false;
          this._snackBar.open("Reminder added successfully", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });

          this.ngOnInit();

          this.medicationPayload.drug_name = '';
          this.medicationPayload.dose = '',
            this.medicationPayload.time = '';
          this.medicationPayload.daily = '';
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
  }


}