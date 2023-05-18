import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.css']
})
export class SosComponent {
  public role_id: any;
  public showmenu: boolean = false;
  public userProfile: any = {
    _id:'',
    firstName: '',
    lastName: '',
    middleName: '',
    username: '',
    selectedJob:'',
    sosContact:[]


  }
  public emergencyContacts:any;
  public firstName:any;
  public lastName:any;
  public username= environment.usernameOfBulkSms
  public api_key=environment.apiKeyOfBulkSms
  public sendername=environment.senderOfBulkSms
  public countdown: number = 30;
  public countdownReached: boolean = false;
  public countdownInterval:any
  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private http:HttpClient) { }
  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data=> {
        const response = data;
        console.log('response', response);
        this.userProfile = response.profile;
        this.role_id = this.userProfile.role_id;
        this.emergencyContacts=this.userProfile.sosContact
        this.firstName=this.userProfile.firstName;
        this.lastName=this.userProfile.lastName
        console.log(this.firstName);
      }, 
      error=> {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
      }
    )
    this.startCountdown()

  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }
  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.countdownReached = true;
        clearInterval(this.countdownInterval);
        console.log("Emergency");
        
        this.callNow()
      }
    }, 1000);
  }
  stopCountdown(): void {
    clearInterval(this.countdownInterval);
   
  }
  callNow(){
    console.log(this.firstName);
    
    this.emergencyContacts.forEach((contact:any) => {
      const messageText = `URGENT: ${contact.contactName}, ${this.firstName } ${this.lastName } [${ this.userProfile.username }] needs your help!   MedAidSOS`;
      const url = 'https://api.ebulksms.com:8080/sendsms';
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      const options = {
        headers: headers,
        params: {
          username: this.username,
          apikey: this.api_key,
          sender: this.sendername,
          messagetext: messageText,
          flash: '0',
          recipients: contact.contactNumber
        }
      };
      this.http.get(url, options).subscribe(
        response => {
          
          this._snackBar.open("SOS message sent successfully", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
         
        },
        error => {
          this._snackBar.open("Error sending SOS message to", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }
      );
  
      
    });


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
