import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-peertopeer-dialogue',
  templateUrl: './peertopeer-dialogue.component.html',
  styleUrls: ['./peertopeer-dialogue.component.css']
})
export class PeertopeerDialogueComponent {
   public showLink:boolean = false;
   public inviteCode:any
   public currentUserEmail: any;
   public allUsers: any;
   public currentChatPickedIndex: any;
   public currentChatPicked: any;
   public currentUser: any;
   public sessionId: any;
   


   constructor(private service: UserService, private ngZone: NgZone, public dialog: MatDialog, public router:Router) {}

   ngOnInit(): void {

    this.currentUserEmail = sessionStorage.getItem('med-email');
   
    

    this.service.GetAllUser(this.currentUserEmail).subscribe((item: any) => {
      this.allUsers = item.users;
      this.service
      .GetCurrentUser(this.currentUserEmail)
      .subscribe((item: any) => {
        this.currentUser = item.currentUser;
      });
    })

   this.currentChatPickedIndex =this.service.currentChatPicked




  }

  generateRandomString(n:any) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < n; i++) {
      let randomCharCode = Math.floor(Math.random() * charactersLength);
      result += String.fromCharCode(characters.charCodeAt(randomCharCode));
    }
    return result;
  }

   createSession(){
   this.inviteCode = this.generateRandomString(15);
  
  this.router.navigate(['/peertopeer',this.inviteCode ])
  sessionStorage.removeItem('med-aid-code') 






   }
   joinSession(){
    this.showLink = true
   }

   enterSession(){
    this.router.navigate(['/peertopeer',this.sessionId ])
    sessionStorage.setItem('med-aid-code',"2") 



   }

}
