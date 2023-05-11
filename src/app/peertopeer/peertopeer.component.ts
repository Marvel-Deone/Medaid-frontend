import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-peertopeer',
  templateUrl: './peertopeer.component.html',
  styleUrls: ['./peertopeer.component.css'],
})
export class PeertopeerComponent {
  public app: any;
  public localStream: any;
  public remoteStream: any;
  public peerConnection: any;
  @ViewChild('user_1') user_1!: ElementRef;
  @ViewChild('user_2') user_2!: ElementRef;
  public currentUserEmail: any;
  public allUsers: any;
  public currentChatPickedIndex: any;
  public currentChatPicked: any;
  public currentUser: any;
  public socket!: Socket;
  public sessionId = "";

  public creatediv: boolean = true
  public joindiv: boolean = false
  public videoRoom: boolean = false
  public joinMeetingBtn = true

  public servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  public roomId: any;

  constructor(private route: ActivatedRoute, private service: UserService, private _snackBar: MatSnackBar,) {
    this.app = firebase.initializeApp(environment.firebaseConfig);
    this.peerConnection = new RTCPeerConnection(this.servers);

  }

  ngOnInit() {

    this.currentUserEmail = sessionStorage.getItem('med-email');
    // Create a socket connection
    this.socket = io('http://localhost:5000').connect();
  

    this.service.GetAllUser(this.currentUserEmail).subscribe((item: any) => {
      this.allUsers = item.users;
      console.log(this.allUsers);
      this.service
        .GetCurrentUser(this.currentUserEmail)
        .subscribe((item: any) => {
          this.currentUser = item.currentUser;
        });
    });

    this.currentChatPickedIndex = this.service.currentChatPicked;
  }

  async allowWebCam() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      this.remoteStream = new MediaStream();
      this.localStream.getTracks().forEach((track: any) => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      this.peerConnection.ontrack = (event: any) => {
        event.streams[0].getTracks().forEach((track: any) => {
          this.remoteStream.addTrack(track);
        });
      };

      this.user_1.nativeElement.srcObject = this.localStream;
      this.user_2.nativeElement.srcObject = this.remoteStream;
    } catch (error) {
      console.error('Error in allowWebCam():', error);
    }
  }

  joinSession() {
    this.creatediv = false
    this.joindiv = true
  }

  async createNewRoom() {
    this.creatediv = false
    this.joindiv = false
    this.videoRoom = true
    await this.allowWebCam();
    const db = firebase.firestore();

    const callDoc = db.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');
    this.roomId = callDoc.id;

    // get candidates caller

    this.peerConnection.onicecandidate = (event: any) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };
    //create offer
    const offerDescription = await this.peerConnection.createOffer();

    await this.peerConnection.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
      roomId: this.roomId,
    };

    await callDoc.set({ offer });

    // send a message to the other person
    this.currentChatPicked = this.allUsers[this.currentChatPickedIndex];

    let msgObj = {
      from: this.currentUser?._id,
      to: this.currentChatPicked?._id,
      message: `Hello, ${this.currentUser?.username} is inviting you to join a session. The session ID is ${this.roomId} `,

    };


    this.service.SendMessage(msgObj).subscribe((item: any) => { });

    this.socket.emit('message', msgObj);

    //  listen for remote answer
    callDoc.onSnapshot((snapshot: any) => {
      const data = snapshot.data();

      if (!this.peerConnection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        this.peerConnection.setRemoteDescription(answerDescription);
      }
    });

    // when answered add candidate to peer connection

    answerCandidates.onSnapshot((snapshot: any) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          this.peerConnection.addIceCandidate(candidate);
        }
      });
    });
  }

  async answerCall() {
    if (this.sessionId == "") {
      this._snackBar.open("Kindly input your session ID ", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });

    } else {
      


      this.creatediv = false;
      this.joindiv = false
      this.videoRoom = true

      await this.allowWebCam();

      const db = firebase.firestore();
      const callDoc = db.collection('calls').doc(this.sessionId);
      const answerCandidates = callDoc.collection('answerCandidates');
      const offerCandidates = callDoc.collection('offerCandidates');
      this.peerConnection.onicecandidate = (event: any) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };
      const callData: any = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      console.log(offerDescription);

      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
        sessionId: this.sessionId,
      };
      await callDoc.update({ answer });


      offerCandidates.onSnapshot((snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          console.log();
          if (change.type === 'added') {
            let data = change.doc.data();

            this.peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
  }
  toogleCamera() {
    let videoTrack = this.localStream
      .getTracks()
      .find((track: any) => track.kind === 'video');

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
    } else {
      videoTrack.enabled = true;
    }
  }
  toogleMic() {
    let audioTrack = this.localStream.getTracks().find((track: any) => track.kind === 'audio')

    if (audioTrack.enabled) {
      audioTrack.enabled = false
    } else {
      audioTrack.enabled = true
    }
  }
}
