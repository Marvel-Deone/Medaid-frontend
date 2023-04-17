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
  public userToken:any;
  public response:any;
  public currentUserDetails:any;
  public currentUserEmail:any;
  public allUsers:any;
  public buttonState:boolean=true
  buttonStates: boolean[] = [];
  
  constructor(private router: Router, private _snackBar: MatSnackBar,  private service: UserService) {}
  ngOnInit(): void {
    this.userToken= JSON.parse(localStorage['token']);
    this.service.GetDashboard(this.userToken).subscribe((item:any)=>{
      this.response=item
      console.log(this.response.result);
      this.currentUserDetails=this.response.result
      if(this.response.status === true){
        this._snackBar.open(this.response.message, "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
         });
         
      }else{
        this._snackBar.open(this.response.message, "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
         });
         this.router.navigate(['sign-in'])

      }
      
    },error=>{
      this._snackBar.open("Internal Server Error", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
       });
       this.router.navigate(['sign-in'])
      
      
    })
    this.currentUserEmail= sessionStorage.getItem('med-email')
    
    
   this.service.GetAllUser(this.currentUserEmail).subscribe((item:any)=>{
    console.log(item);
    this.allUsers= item.users

    

   })
    
   
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
