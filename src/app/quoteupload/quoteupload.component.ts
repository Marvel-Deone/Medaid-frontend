import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-quoteupload',
  templateUrl: './quoteupload.component.html',
  styleUrls: ['./quoteupload.component.css']
})
export class QuoteuploadComponent {
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
  public nameOfAuthor:any= ""
  public quote:any=""

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, ) { }
  ngOnInit(): void {

     
   
    this.userToken = JSON.parse(localStorage['token']);

    this.service.GetProfile().subscribe(
      data=> {
        const response = data;
        this.userProfile = response.profile;
        this.role_id = this.userProfile.role_id;
      }, 
      error=> {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
        
      }
    )

    

 

  }
  uploadQuote(){
    try {
      if(this.nameOfAuthor =="" && this.quote==""){
        this._snackBar.open("Kindly fill up the blank space(s)", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        }); 
        this.nameOfAuthor="";
        this.quote=''
      } else if(this.nameOfAuthor =="" ||this.quote==""){
        this._snackBar.open("Kindly fill up the blank space(s)", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        }); 
      }else{
        this.service.GetPostQuote({nameOfAuthor:this.nameOfAuthor,quote:this.quote}).subscribe((res:any)=>{
         
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
    } catch (error:any) {
      this._snackBar.open("Kindly check your internet", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      }); 
    }
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
    
  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }

}
