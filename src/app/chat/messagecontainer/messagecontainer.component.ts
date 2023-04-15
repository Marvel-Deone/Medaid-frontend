import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-messagecontainer',
  templateUrl: './messagecontainer.component.html',
  styleUrls: ['./messagecontainer.component.css']
})
export class MessagecontainerComponent {
  public currentUserEmail:any;
  public allUsers:any;
  public currentChatPicked:any
  public currentUser:any;
  public messageInp=""
  public showBtn= false
  constructor(  private service: UserService) {}
  ngOnInit(): void {
    this.currentUserEmail= sessionStorage.getItem('med-email')
   this.service.GetAllUser(this.currentUserEmail).subscribe((item:any)=>{
    console.log(item);
    this.allUsers= item.users 
    console.log(this.allUsers);
   this.service.GetCurrentUser(this.currentUserEmail).subscribe((item:any)=>{
    this.currentUser=item.currentUser
     
      
    })
    
   })
    
  }
  public handleIndex (index: number){
    this.currentChatPicked=this.allUsers[index] 
    console.log(this.currentChatPicked);
      
  }
  
   
   

 
  sendMsg(){
    let msgObj={
      from:this.currentUser._id,
      to:this.currentChatPicked._id,
      message:this.messageInp,
     
    }

    this.service.SendMessage(msgObj).subscribe((item:any)=>{

    })
    
    

  }
}
