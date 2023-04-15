import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent {
  public currentUserEmail:any;
  public allUsers:any;
  public buttonState:boolean=true
  constructor(private router: Router, private _snackBar: MatSnackBar,  private service: UserService) {}
  ngOnInit(): void {

  }


  
}

