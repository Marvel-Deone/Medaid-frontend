import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.css'],
})
export class SosComponent {
  public role_id: any;
  public showmenu: boolean = false;
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
  sosContactPayload: any = {
    username: '',
    email: '',
    sosContact: {
      contact_name: '',
      contact_number: '',
    },
  };

  singleSosContact: any;
  public emergencyContacts: any;
  public firstName: any;
  public lastName: any;
  public username = environment.usernameOfBulkSms;
  public api_key = environment.apiKeyOfBulkSms;
  public sendername = environment.senderOfBulkSms;
  public countdown: number = 30;
  public countdownReached: boolean = false;
  public countdownInterval: any;
  conditions = [
    { value: 'Fire Accident', viewValue: 'Fire Accident' },
    { value: 'Asthma', viewValue: 'Asthma' },
    { value: 'Heart Attack', viewValue: 'Heart Attack' },
    { value: 'Crises', viewValue: 'Crises' },
    { value: 'Water ', viewValue: 'Water  ' },
    { value: 'Drowning', viewValue: ' Drowning' },
    { value: 'Other', viewValue: 'Other' },
  ];
  showTextArea = false;
  textAreaValue = '';
  selectedCondition = '';
  public showChatDiv: any = false;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private service: UserService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      (data) => {
        const response = data;
        console.log('response', response);
        this.userProfile = response.profile;
        this.userProfile.is_profileComplete = response.profile.is_profileComplete;
        this.role_id = this.userProfile.role_id;
        this.firstName = this.userProfile.firstName;
        this.lastName = this.userProfile.lastName;
      },
      (error) => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
      }
    );
    this.service.getSosContact().subscribe(
      (data) => {
        const response = data;
        console.log('myRes', response);

        if (response.sosContacts !== null) {
          this.emergencyContacts = response.sosContacts;
          console.log('sosContacts', this.emergencyContacts);
        }
      },
      (error) => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
      }
    );
    this.startCountdown();
  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }
  startCountdown(): void {
    
    if (this.userProfile.is_profileComplete) {
    console.log('countdown start');
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.countdownReached = true;
        clearInterval(this.countdownInterval);
        console.log('Emergency');

        this.callNow();
      }
    }, 1000);
  }
  }
  stopCountdown(): void {
    clearInterval(this.countdownInterval);
  }
  callNow() {
    console.log(this.userProfile.firstName);
    this.emergencyContacts.forEach((contact: any) => {
      const messageText = `URGENT: Attention ${contact.sosContact.contact_name}!! ${contact.firstName} ${contact.lastName} [${contact.username}] requires immediate assistance! An urgent situation has arisen. Please contact them at ${contact.phone} for immediate help!!! MedAidSaveOurSoul`;
      console.log(messageText);
      const url = 'https://api.ebulksms.com:8080/sendsms';
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const options = {
        headers: headers,
        params: {
          username: this.username,
          apikey: this.api_key,
          sender: this.sendername,
          messagetext: messageText,
          flash: '0',
          recipients: [contact.sosContact.contact_number],
        },
        responseType: 'text',
      };

      this.http
        .request('get', url, { ...options, responseType: 'text' })
        .subscribe(
          (response: any) => {
            console.log(response);
            this._snackBar.open('SOS message sent successfully', 'OK', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
          },
          (error: any) => {
            console.error(error);
            this._snackBar.open('Error sending SOS message', 'OK', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          }
        );
    });
  }
  showChatArea() {
    this.showChatDiv = !this.showChatDiv;
  }
  onConditionSelected(selectedValue: string): void {
    if (selectedValue === 'Other') {
      this.showTextArea = true;
    } else {
      this.showTextArea = false;
    }
  }
  logButtonClicked(): void {
    
    this.emergencyContacts.forEach((contact: any) => {
      const selectedEmergency =
        this.selectedCondition === 'Other'
          ? this.textAreaValue
          : this.selectedCondition;
      const messageText = `URGENT: Attention ${contact.sosContact.contact_name}!! ${contact.firstName} ${contact.lastName} [${contact.username}] requires immediate assistance! An urgent situation has arisen due to ${selectedEmergency} emergency. Please contact them at ${contact.phone} for immediate help!!! MedAidSaveOurSoul`;
      console.log(messageText);

      const url = 'https://api.ebulksms.com:8080/sendsms';
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const options = {
        headers: headers,
        params: {
          username: this.username,
          apikey: this.api_key,
          sender: this.sendername,
          messagetext: messageText,
          flash: '0',
          recipients: [contact.sosContact.contact_number],
        },
        responseType: 'text',
      };

      this.http
        .request('get', url, { ...options, responseType: 'text' })
        .subscribe(
          (response: any) => {
            console.log(response);
            this._snackBar.open('SOS message sent successfully', 'OK', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
            this.selectedCondition= ""
            this.textAreaValue=""
          },
          (error: any) => {
            console.error(error);
            this._snackBar.open('Error sending SOS message', 'OK', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          }
        );
    });
  }

  logout() {
    localStorage.removeItem('token');
    this._snackBar.open('Logout Successful', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    this.router.navigate(['/sign-in']);
  }
}