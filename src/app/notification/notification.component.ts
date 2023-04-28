import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  public showmenu: boolean = false;

  constructor(private router: Router, private service: UserService) {}

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

  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      data=> {
        const response = data;
        console.log('response: ' + response);
        
        this.userProfile.username = response.profile.username;
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

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }

}
