import { Component, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogService } from 'src/app/services/blog/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  public userProfile: any;
  public role_id: any;
  public showmenu: boolean = false;
  htmlContent: any; 
  loading: boolean = false;

  public blogPayload = {
    username: '',
    position: '',
    article: ''
  }


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '75vh',
    maxHeight: '75vh',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'P',
    defaultFontName: 'Arial',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
  errorMessage: any;
  username: any;

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private el: ElementRef, private blogService: BlogService) { }
  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        this.userProfile = response.profile;
        this.role_id = this.userProfile.role_id;
        this.username = this.userProfile.username;
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
      }
    )

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
  }

  publish() {
    this.blogPayload.username = this.username;
    this.blogPayload.article = this.htmlContent;
    this.loading = true;
    this.blogService.blog(this.blogPayload).subscribe(
      data => {
        const response = data;
        this.loading = false;
        this._snackBar.open("Blog posted successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        this.blogPayload.article = '';
      },
      errorResponse => {
        this.loading = false;
        this.errorMessage = errorResponse.error.message;
        console.log('errorMessage', this.errorMessage);

        this._snackBar.open("Something went wrong, pls try again", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      })
  }
}
