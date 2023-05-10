import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email-very',
  templateUrl: './email-very.component.html',
  styleUrls: ['./email-very.component.css']
})
export class EmailVeryComponent {
  public userPin:any="";
  public response:any
  public userEmail:any;
  constructor(public service: UserService,  private _snackBar: MatSnackBar, public router:Router) { }

  ngOnInit(): void {
    this.userEmail=sessionStorage.getItem('med-email')
  
    

  }

  verifyEmail(){
    if(this.userPin==""){
    this._snackBar.open("Kindly input your Pin ", "OK", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'login-snackbar'],
     });
  }else{ 
    this.service.VerifyEmail({userpin:this.userPin,email:this.userEmail}).subscribe((item:any)=>{
      this.response= item
      console.log(this.response);
      
      
      if(this.response.status){
        this._snackBar.open(this.response.message, "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
         });
         sessionStorage.removeItem('med-email');

         this.router.navigate(['/sign-in'])
      }else{
        this._snackBar.open(this.response.message, "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
         });

      }
      
    },error=>{
      this._snackBar.open("Internal Server Error", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
       });
      
    })


  }
}
}