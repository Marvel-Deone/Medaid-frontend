import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MedicationReminderService } from '../services/medicationReminder/medication-reminder.service';
import { SelfAssessmentService } from '../services/self-assessment/self-assessment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public userToken: any;
  public response: any;
  public currentUserDetails: any;
  public currentUserEmail: any;
  public allUsers: any;
  public buttonState: boolean = true;
  buttonStates: boolean[] = [];
  // public userProfile: any;
  public role_id: any;
  public showmenu: boolean = false;
  totalMedication: any;
  totalReminder: any;
  totalSelfAssessment: any;
  username: any;
  public userProfile: any = {
    _id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    username: '',
    selectedJob: '',
    sosContact: [],
    is_profileComplete: false
  };
  selfAssessments: any;
  selfAssessment: any;
  selfAssessmentLists: any;
  displayQuestions: any;
  myQuest: string[] = [];
  getResultStatus: boolean = false;
  downloadme: boolean = false;
  currentSelfAssementId: any;
  downloadResult: any;
  selectedCategory: any;


  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private medicationReminderService: MedicationReminderService, private selfAssessmentService: SelfAssessmentService, private selfAssessmentAnswer: SelfAssessmentService) { }
  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage['token']);

    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        // this.userProfile = response.profile;
        this.userProfile._id = response.profile._id;
        this.userProfile.username = response.profile.username;
        this.userProfile.firstName = response.profile.firstName;
        this.userProfile.lastName = response.profile.lastName;
        this.userProfile.middleName = response.profile.middleName;
        this.userProfile.selectedJob = response.profile.selectedJob;
        this.userProfile.sosContact = response.profile.sosContact;
        this.userProfile.is_profileComplete = response.profile.is_profileComplete;
        this.role_id = response.profile.role_id;
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    );


    this.service.GetDashboard(this.userToken).subscribe(
      item => {
      },
      error => {
        this._snackBar.open("Internal Server Error", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        console.log('error', error);

        this.router.navigate(['sign-in']);
      })
    this.currentUserEmail = sessionStorage.getItem('med-email')


    this.service.GetAllUser(this.currentUserEmail).subscribe((item: any) => {
      this.allUsers = item.users
    })


    this.medicationReminderService.getMedication().subscribe(
      (data: any) => {
        const response = data;

        if (response.medications !== null) {
          this.totalMedication = response.medications.length;
        }
      },
      (error: any) => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    )

    this.selfAssessmentAnswer.getSelfAssessmentAnswer().subscribe(
      (data: any) => {
        const response = data;
        this.selfAssessments = response.selfAssessments;
        this.totalSelfAssessment = response.selfAssessments.length;
      },
      (error: any) => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    )

    this.medicationReminderService.getReminder().subscribe(
      (data: any) => {
        const response = data;

        if (response.reminder !== null) {
          this.totalReminder = response.reminders.length;
        }
      },
      (error: any) => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    )

  }


  changeMenuStatus() {
    this.showmenu = !this.showmenu;
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



  public keepUpWith(i: any) {


    // let userId = this.allUsers[i]._id;
    // let userName = this.allUsers[i].username;
    // this.service.getkeepUpWith({userId, userName}).subscribe((item: any) => {
    //   if (item.status === true) {

    //     this._snackBar.open(item.message, "OK", {
    //       duration: 3000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //       panelClass: ['green-snackbar', 'login-snackbar'],
    //     });
    //     this.buttonState = false; // set buttonState to false when user is kept up with
    //   } else {
    //     this._snackBar.open(item.message, "OK", {
    //       duration: 3000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //       panelClass: ['green-snackbar', 'login-snackbar'],
    //     });
    //   }
    // });
  }

  getResult(id: any, selectedCategory: any) {
    // this.showAlertModal = false;
    this.getResultStatus = true;
    this.currentSelfAssementId = id;
    this.selectedCategory = selectedCategory;
    this.selfAssessmentService.getSingleSelfAssessment(id).subscribe(
      (data: any) => {
        const response = data;
        this.selfAssessment = response;
        this.selfAssessmentLists = this.selfAssessment.selfAssessment.questionsAnswers;
        for (let i = 0; i < this.displayQuestions.length; i++) {
          const element = this.displayQuestions[i].Question;
          this.myQuest.push(element)
        }

      })
  }

  generatePDF() {
    this.downloadme = true;

    console.log('long');
    this.selfAssessmentService.downloadPDF(this.currentSelfAssementId).subscribe(data => {
      const response = data;
      this.downloadme = false;
      this.downloadResult = response;

      console.log('response', response);
      console.log(response.filedirectory);
      // window.open(window.document.location.href = this.downloadResult.filedirectory, '_blank');
      window.location.href = this.downloadResult.filedirectory;
    },
      err => {
        console.log('errorResponse', err);
      })
  }


  cancel() {
    this.getResultStatus = false;
  }



}
