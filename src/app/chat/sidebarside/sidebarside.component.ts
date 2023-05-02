import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sidebarside',
  templateUrl: './sidebarside.component.html',
  styleUrls: ['./sidebarside.component.css']
})
export class SidebarsideComponent {
  public currentUserEmail:any;
  public allUsers:any;
  @Output () indexEmitter = new EventEmitter<number>();
  constructor(private router: Router, private _snackBar: MatSnackBar,  private service: UserService) {}
  ngOnInit(): void {
    this.currentUserEmail= sessionStorage.getItem('med-email')
    this.service.GetAllUser(this.currentUserEmail).subscribe((item:any)=>{
      
      this.allUsers= item.users
  
      
  
     })
  }

  onClickChat(i:any){
   this.indexEmitter.emit(i,)
  }

}
