import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import {MatDialog} from '@angular/material/dialog';
import { PeertopeerDialogueComponent } from 'src/app/dialogues/peertopeer-dialogue/peertopeer-dialogue.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-messagecontainer',
  templateUrl: './messagecontainer.component.html',
  styleUrls: ['./messagecontainer.component.css'],
})
export class MessagecontainerComponent {
  public currentUserEmail: any;
  public allUsers: any;
  public currentChatPicked: any;
  public currentUser: any;
  public messageInp = '';
  public showBtn = false;
  public messages: any;
  public chats: any;
  private socket!: Socket;
  public showMsgBox =false
  private uriseg = environment.socket;
  public userProfile: any = {
    _id:'',
    email:'',
    firstName: '',
    username: '',
    selectedJob:''

  }
  public currentTime= new Date();

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  constructor(private service: UserService, private ngZone: NgZone, public dialog: MatDialog, private router:Router) {}
  ngOnInit(): void {
    this.service.GetProfile().subscribe(
      data => {
        const response = data;
 
        this.userProfile.username = response.profile.username;
        this.userProfile._id=response.profile._id
        this.userProfile.selectedJob= response.profile.selectedJob
        this.userProfile.email =response.profile.email
      }
      
      )

     this.userProfile.email = sessionStorage.getItem('med-email')
    // Create a socket connection
    this.socket = io('http://localhost:5000').connect();

    // Listen for incoming messages
    this.socket.on('new-message', (message: any) => {
      this.ngZone.run(() => {
        this.chats.push(message);
        

      });
    });

    this.socket.on('out-going', (message: any) => {
      this.ngZone.run(() => {
        this.chats.push({ ...message, fromSelf: true });
        
   
        
      });
    });

    this.service.GetAllUser( this.userProfile.email).subscribe((item: any) => {

      this.allUsers = item.users;
      
 
      this.service
        .GetCurrentUser( this.userProfile.email)
        .subscribe((item: any) => {
          this.currentUser = item.currentUser;
        });
    });
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    // Scroll to bottom after new message is added
    this.scrollToBottom();
  }
  public handleIndex(index: number) {

    this.currentChatPicked = this.allUsers[index];
    // to Update the global currentUserPicked
    this.service.currentChatPicked = index
    this.showMsgBox =true

    this.service
      .GetAllMessages({
        from: this.currentUser?._id,
        to: this.currentChatPicked?._id,
      })
      .subscribe((item: any) => {
        this.chats = item;
      });
      this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMsg() {
    let msgObj = {
      from: this.userProfile._id,
      to: this.currentChatPicked._id,
      message: this.messageInp,
    };  
    this.service.SendMessage(msgObj).subscribe((item: any) => {});
    this.socket.emit('message', msgObj);

    this.messageInp = '';
  }
  openDialog(){
    // const dislogueRef= this.dialog.open(PeertopeerDialogueComponent,{
    //   width:"450px"
    // } );
    this.router.navigate(["/peertopeer"])
    
  }
}
