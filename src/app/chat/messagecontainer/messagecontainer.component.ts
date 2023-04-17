import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
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
  
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  constructor(private service: UserService, private ngZone: NgZone) {}
  ngOnInit(): void {
    this.currentUserEmail = sessionStorage.getItem('med-email');
    // Create a socket connection
    this.socket = io('http://localhost:5000').connect();
    console.log('Socket connected:', this.socket.connected);

    // Listen for incoming messages
    this.socket.on('new-message', (message: any) => {
      console.log('messsage received', message);
      this.ngZone.run(() => {
        this.chats.push(message);
      });
    });

    this.socket.on('out-going', (message: any) => {
      console.log('Outgoing message:', message);
      this.ngZone.run(() => {
        this.chats.push({ ...message, fromSelf: true });
      });
    });

    this.service.GetAllUser(this.currentUserEmail).subscribe((item: any) => {
      console.log(item);
      this.allUsers = item.users;
      console.log(this.allUsers);
      this.service
        .GetCurrentUser(this.currentUserEmail)
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
    this.service
      .GetAllMessages({
        from: this.currentUser?._id,
        to: this.currentChatPicked?._id,
      })
      .subscribe((item: any) => {
        this.chats = item;
        console.log(item);
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
      from: this.currentUser._id,
      to: this.currentChatPicked._id,
      message: this.messageInp,
    };
    this.service.SendMessage(msgObj).subscribe((item: any) => {});
    this.socket.emit('message', msgObj);

    this.messageInp = '';
  }

}
