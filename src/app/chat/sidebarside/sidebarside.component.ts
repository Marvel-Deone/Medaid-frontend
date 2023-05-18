import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sidebarside',
  templateUrl: './sidebarside.component.html',
  styleUrls: ['./sidebarside.component.css']
})
export class SidebarsideComponent {
  public currentUserEmail:any;
  public allUsers:any;
  public userProfile: any = {
    _id:'',
    firstName: '',
    username: '',
    selectedJob:'',
    email:'',
    role_id: ''

  }

  @Output () indexEmitter = new EventEmitter<number>();
  constructor(private router: Router, private _snackBar: MatSnackBar,  private service: UserService) {}
  async ngOnInit(){
    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        console.log('response ', response);
 
        this.userProfile.username = response.profile.username;
        this.userProfile._id=response.profile._id
        this.userProfile.role_id=response.profile.role_id
        this.userProfile.selectedJob= response.profile.selectedJob
        this.userProfile.email =response.profile.email
      }
      
      )
     this.userProfile.email= sessionStorage.getItem('med-email')
   await this.service.GetAllUser( this.userProfile.email).subscribe((item:any)=>{
     
      

      this.allUsers= item.users
   
      
      
      
  
      
  
     })
  }


  onClickChat(i:any){
   this.indexEmitter.emit(i,)
  }

  getLastMsgAndTime(){
    
  }

}
