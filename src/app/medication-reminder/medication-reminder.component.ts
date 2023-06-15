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
    email: '',
    medication: {
      drug_name: '',
      dose: '',
      daily: '',
      interval: {
        is_morning: false,
        is_afternoon: false,
        is_night: false
      }
    }
  }

  public reminderPayload: any = {
    username: '',
    email: '',
    reminder: {
      title: '',
      date: '',
      time: ''
    }
  }

  loading: boolean = false;
  errorMessage: any;
  medications: any;
  reminders: any;
  singleMedication: any;
  singleReminder: any;

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private medicationReminderService: MedicationReminderService) { };


  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        this.userProfile = response.profile;
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
        if (response.medications !== null) {
          this.medications = response.medications;
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

        if (response.reminder !== null) {
          this.reminders = response.reminders;
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

    if (this.medicationPayload.medication.drug_name == null || this.medicationPayload.medication.dose == null || this.medicationPayload.medication.daily == null) {
      this.loading = false;
      this._snackBar.open("All the fields must be filled", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else {
      this.medicationPayload.username = this.userProfile.username;
      this.medicationPayload.email = this.userProfile.email;
      if (this.medicationPayload.medication.daily == 'morning') {
        this.medicationPayload.medication.interval.is_morning = true;
        this.medicationPayload.medication.interval.is_afternoon = false;
        this.medicationPayload.medication.interval.is_night = false;
      } else if (this.medicationPayload.medication.daily == 'afternoon') {
        this.medicationPayload.medication.interval.is_morning = false;
        this.medicationPayload.medication.interval.is_afternoon = true;
        this.medicationPayload.medication.interval.is_night = false;
      } else if (this.medicationPayload.medication.daily == 'night') {
        this.medicationPayload.medication.interval.is_morning = false;
        this.medicationPayload.medication.interval.is_afternoon = false;
        this.medicationPayload.medication.interval.is_night = true;
      } else if (this.medicationPayload.medication.daily == 'morning & afternoon') {
        this.medicationPayload.medication.interval.is_morning = true;
        this.medicationPayload.medication.interval.is_afternoon = true;
        this.medicationPayload.medication.interval.is_night = false;
      } else if (this.medicationPayload.medication.daily == 'morning & night') {
        this.medicationPayload.medication.interval.is_morning = true;
        this.medicationPayload.medication.interval.is_afternoon = false;
        this.medicationPayload.medication.interval.is_night = true;
      } else if (this.medicationPayload.medication.daily == 'afternoon & night') {
        this.medicationPayload.medication.interval.is_morning = false;
        this.medicationPayload.medication.interval.is_afternoon = true;
        this.medicationPayload.medication.interval.is_night = true;
      } else if (this.medicationPayload.medication.daily == 'three') {
        this.medicationPayload.medication.interval.is_morning = false;
        this.medicationPayload.medication.interval.is_afternoon = true;
        this.medicationPayload.medication.interval.is_night = true;
      }


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

          this.medicationPayload.medication.drug_name = "";
          this.medicationPayload.medication.dose = "";
          this.medicationPayload.medication.daily = "";
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


  getSingleMedication(id: any) {
    this.medicationReminderService.getSingleMedication(id).subscribe(
      data => {
        const response = data;
        this.singleMedication = response;
        
        this.medicationPayload.medication.drug_name = this.singleMedication.medication.medication.drug_name;
        this.medicationPayload.medication.dose = this.singleMedication.medication.medication.dose;
        this.medicationPayload.medication.daily = this.singleMedication.medication.medication.daily;
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error;
        console.log('errorMessage', this.errorMessage);
      })
  }

  updateMedication() {
    this.medicationReminderService.updateMedication(this.medicationPayload, this.singleMedication.medication._id).subscribe(
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

          this.medicationPayload.medication.drug_name = "";
          this.medicationPayload.medication.dose = "";
          this.medicationPayload.medication.daily = "";
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

  deleteMedication(id: any) {
    this.medicationReminderService.deleteMedication(id).subscribe(
      data => {
        const response = data;
        this.loading = false;
        this._snackBar.open("Medication deleted successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });

        this.ngOnInit();

        this.medicationPayload.drug_name = '';
        this.medicationPayload.dose = '',
          this.medicationPayload.interval = '';
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

  
  saveReminder() {
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
      this.reminderPayload.email = this.userProfile.email;

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

          this.reminderPayload.reminder.title = "";
          this.reminderPayload.reminder.date = "",
          this.reminderPayload.reminder.time = "";
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

  getSingleReminder(id: any) {
    this.medicationReminderService.getSingleReminder(id).subscribe(
      data => {
        const response = data;
        this.singleReminder = response;

        this.reminderPayload.reminder.title = this.singleReminder.reminder.reminder.title;
        this.reminderPayload.reminder.date = this.singleReminder.reminder.reminder.date,
        this.reminderPayload.reminder.time = this.singleReminder.reminder.reminder.time;
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error;
        console.log('errorMessage', this.errorMessage);
      })
  }

  updateReminder() {
    this.medicationReminderService.updateReminder(this.reminderPayload,  this.singleReminder.reminder._id).subscribe(
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

        this.reminderPayload.reminder.title = "";
        this.reminderPayload.reminder.date = "",
        this.reminderPayload.reminder.time = "";

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

  deleteReminder(id: any) {
    this.medicationReminderService.deleteReminder(id).subscribe(
      data => {
        const response = data;
        this.loading = false;
        this._snackBar.open("Reminder deleted successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });

        this.ngOnInit();

        this.medicationPayload.drug_name = '';
        this.medicationPayload.dose = '',
          this.medicationPayload.interval = '';
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
