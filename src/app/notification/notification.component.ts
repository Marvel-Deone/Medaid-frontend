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
  public role_id: any;
  public allNotification:any
  public currentUserId:any

  constructor(private router: Router, private service: UserService) {}

  public userProfile = {
    _id:'',
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
      (data:any)=> {
        const response = data;
      
      
        
        this.userProfile.username = response.profile.username;
        this.role_id = response.profile.role_id;
        this.currentUserId= response.profile._id
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
    this.service.GetNotification().subscribe((data:any)=>{
     const notifications= data.notifications
      
      this.allNotification = notifications.filter((val:any)=>val.
      receiverId== this.currentUserId
      )
   })

    
    
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
