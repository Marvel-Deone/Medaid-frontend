import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public userToken: any;
  public response: any;
  public currentUserDetails: any;
  public currentUserEmail: any;
  public allUsers: any;
  public buttonState: boolean = true;
  buttonStates: boolean[] = [];
  public userProfile:any;
  public role_id: any;
  public showmenu: boolean = false;


  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService) { }
  ngOnInit(): void {
    this.userToken = JSON.parse(localStorage['token']);

    this.service.GetProfile().subscribe(
      data=> {
        const response = data;
        console.log('response', response);
        
        this.userProfile = response.profile;

        console.log('userProfile', this.userProfile.sosContact);
        
        this.role_id = this.userProfile.role_id;
      }, 
      error=> {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
        
      }
    )

    this.service.GetDashboard(this.userToken).subscribe(
      item=> {
        console.log('item', item);
      },
      error => {
        this._snackBar.open("Internal Server Error", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
       });
       console.log('error', error);
       
       this.router.navigate(['sign-in']);
    })
    this.currentUserEmail = sessionStorage.getItem('med-email')


    this.service.GetAllUser(this.currentUserEmail).subscribe((item: any) => {
      this.allUsers = item.users
    })

  }

  
  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
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



  public keepUpWith(i: any) {


    // console.log("hey");
    // let userId = this.allUsers[i]._id;
    // let userName = this.allUsers[i].username;
    // this.service.getkeepUpWith({userId, userName}).subscribe((item: any) => {
    //   console.log(item.status);
    //   if (item.status === true) {

    //     this._snackBar.open(item.message, "OK", {
    //       duration: 3000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //       panelClass: ['green-snackbar', 'login-snackbar'],
    //     });
    //     this.buttonState = false; // set buttonState to false when user is kept up with
    //   } else {
    //     this._snackBar.open(item.message, "OK", {
    //       duration: 3000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //       panelClass: ['green-snackbar', 'login-snackbar'],
    //     });
    //   }
    // });
  }



}
