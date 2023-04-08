import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public hide: boolean = true;
  respdata: any;
  public signupForm?: any;
  loading = false;
  errorResp?: any;
  errorMessage?: any;
  status ?: boolean;

  constructor(private fb: FormBuilder, public router: Router, public service: UserService, private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
    console.log('error message', this.errorMessage);
    
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirm_password: ['', Validators.required,],
    }
    // {
    //   validators: this.pwrdMatch('password', 'confirmpassword')
    // }
    );
  }

  get signup() { return this.signupForm.controls };

  onSubmit(form: FormGroup) {
    console.log(form.value);

    this.service.Register(form.value).subscribe(item => {
      this.respdata = item;
      // this._snackbar.open("Registration Successful", "X");
      this._snackBar.open("Registeration Successful!", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
       });

      this.router.navigate(['sign-in']);
      this.loading = false;
    },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error.message;
        this.status = errorResponse.error.status;
        console.log('Registration Failed', errorResponse.error.message);
        this.errorMessage ? this._snackBar.open(this.errorMessage, "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
         }) : this._snackBar.open("Pls check your internet connection","OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
         });
        // this._snackbar.open(errorResponse.error.message, "X");
      })
      
  }

}
