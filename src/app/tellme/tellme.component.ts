import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-tellme',
  templateUrl: './tellme.component.html',
  styleUrls: ['./tellme.component.css'],
})
export class TellmeComponent {
  public userToken: any;
  public response: any;
  public currentUserDetails: any;
  public currentUserEmail: any;
  public allUsers: any;
  public buttonState: boolean = true;
  buttonStates: boolean[] = [];
  public userProfile: any;
  public role_id: any;
  public showmenu: boolean = false;
  public quotes: any;
  public selectedQuote: any;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private service: UserService,
    public http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.service.Getquote().subscribe((res: any) => {
      this.quotes = res?.data;
      this.selectedQuote =
        this.quotes[Math.floor(Math.random() * this.quotes.length)];
    });

    this.userToken = JSON.parse(localStorage['token']);

    this.service.GetProfile().subscribe(
      (data) => {
        const response = data;
        this.userProfile = response.profile;
        this.role_id = this.userProfile.role_id;
      },
      (error) => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
      }
    );

    this.service.GetDashboard(this.userToken).subscribe(
      (item) => {},
      (error) => {
        this._snackBar.open('Internal Server Error', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        console.log('error', error);

        this.router.navigate(['sign-in']);
      }
    );
    this.currentUserEmail = sessionStorage.getItem('med-email');

    this.service.GetAllUser(this.currentUserEmail).subscribe((item: any) => {
      this.allUsers = item.users;
    });
  }
  logout() {
    localStorage.removeItem('token');
    this._snackBar.open('Logout Successful', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    this.router.navigate(['/sign-in']);
  }

  public keepUpWith(i: any) {}

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }
  getQuote() {
    this.generateRandomColor();
    this.selectedQuote =
      this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }
  generateRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return '#' + randomColor;
    // this.changeDetectorRef.detectChanges();
  }
  copyQuote() {
    let selectedQuote = `${this.selectedQuote.quote} from ${this.selectedQuote.nameOfAuthor}. Copied from Medaid `;
    navigator.clipboard
      .writeText(selectedQuote)
      .then(() => {
        this._snackBar.open('Text copied to clipboard', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      })
      .catch((err) => {
        this._snackBar.open('Could not copy text', 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      });
  }
}
