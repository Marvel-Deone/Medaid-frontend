import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ExpertService } from '../services/expert.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent {
  public profileTitle: string = 'medical_info';
  public loading = false;
  public errorMessage: any;
  contact_owner: any;
  contact_no: any;
  public role_id: any;
  public userProfile: any = {
    _id:'',
    firstName: '',
    username: '',
    selectedJob:''

  }
  public showmenu: boolean = false;
  showModal: boolean = false;
  public allExperts: any;
  public userSosContacts: any;
  public currentUserEmail:any;
  public allConsultReq :any

  
 

  constructor(private router: Router, private service: UserService, private _snackBar: MatSnackBar, private expertService:ExpertService) { }
  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        console.log('response ', response);
        this.role_id = response.profile.role_id;
        this.userProfile.username = response.profile.username;
        this.userProfile._id=response.profile._id
        this.userProfile.selectedJob= response.profile.selectedJob
      }
      
      )
      this.currentUserEmail =sessionStorage.getItem('med-email')
      this.expertService.GetExpertUser(this.currentUserEmail).subscribe((res:any)=>{
        //to randomize the expert 
        for (let i = res.users.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [res.users[i], res.users[j]] = [res.users[j], res.users[i]];
        }
        this.allExperts = res.users;
        
      })

      this.service.GetNotification().subscribe((data:any)=>{
        const notifications= data.notifications
       
         
         this.allConsultReq = notifications.filter((val:any)=>val.
         receiverId== this.userProfile._id
         )
         console.log(this.allConsultReq);
         
      })
      
    }
    
  changeMenuStatus() {
    this.showmenu = !this.showmenu;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
  consult(i:any){
 
    let notificationMsg = `${this.userProfile.username} want to consult you `
    let notificationObj= {
      message: notificationMsg,
      senderId: this.userProfile._id,
      senderUserName: this.userProfile.username,
      receiverId: this.allExperts[i]._id,
    }
  
    
  
    
     this.expertService.getConsultRequest(notificationObj).subscribe((res:any)=>{
        if(res.status==true){
          this._snackBar.open(res.message, "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }else{
          this._snackBar.open(res.message, "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }
    
      
      
     })

    
   
    
  }   
  accept(i:any){
   
     let notificationMsg = `${this.userProfile.selectedJob} ${this.userProfile.username}  accepted your request `; 
     console.log(notificationMsg);
     
    let notificationObj= {
      message: notificationMsg,
      senderId: this.userProfile._id,
      senderUserName: this.userProfile.username,
      receiverId: this.allConsultReq[i].senderId ,
    }
    this.expertService.getPostAcceptedorRejected(notificationObj).subscribe((res:any)=>{
        if(res.status==true){
          this._snackBar.open("Accepted successfully", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }

    })
    
    
  }
  decline(i:any){
    let notificationMsg = `${this.userProfile.selectedJob} ${this.userProfile.username} rejected your request `; 
     console.log(notificationMsg);
     
    let notificationObj= {
      message: notificationMsg,
      senderId: this.userProfile._id,
      senderUserName: this.userProfile.username,
      receiverId: this.allConsultReq[i].senderId ,
    }
    this.expertService.getPostAcceptedorRejected(notificationObj).subscribe((res:any)=>{
      if(res.status==true){ 
        this._snackBar.open("Accepted successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      }
      
    })
    
  }
}
