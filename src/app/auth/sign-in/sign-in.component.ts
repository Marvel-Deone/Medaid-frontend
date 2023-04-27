import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  public signinForm?: any;
  loading = false;
  errorResp?: any;
  errorMessage?: any;
  public hide: boolean = true;
  respData: any;
  error: any;

  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private notification: NzNotificationService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  onSubmit(form: FormGroup) {
    this.loading = true;

    this.service.Login(form.value).subscribe(
      item => {
        this.loading = false;
        this.respData = item;
        // this._snackBar.open("Login successful", "X");
        sessionStorage.setItem('med-email', form.value.email);
        this._snackBar.open("Login Successful", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        this.router.navigate(['/dashboard']);
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error.message;
        this.error = errorResponse.message;
        console.log('errorMessage', this.errorMessage);

        if (this.errorMessage) {
          this._snackBar.open(this.errorMessage, "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          console.log('errorMessage', errorResponse.message);
        } else if (this.error.includes("Http failure response for")) {
          this._snackBar.open("Something went wrong, try again", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
          console.log('errorMessage', errorResponse);
        } 
        // else if(!errorResponse.error.message) {
        //   this._snackBar.open("Pls check your internet connection", "OK", {
        //     duration: 3000,
        //     horizontalPosition: 'right',
        //     verticalPosition: 'bottom',
        //     panelClass: ['green-snackbar', 'login-snackbar'],
        //   });
        //   console.log('errorMessage', errorResponse);
        // }
        // form.reset();
      });
  }

  // openSuccessSnackBar(){
  //   this._snackBar.open("Login Successful", "OK", {
  //     // duration: 3000,
  //     horizontalPosition: 'right',
  //     verticalPosition: 'bottom',
  //     panelClass: ['green-snackbar', 'login-snackbar'],
  //    });
  //   }

}
