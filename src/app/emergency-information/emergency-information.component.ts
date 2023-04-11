import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-information',
  templateUrl: './emergency-information.component.html',
  styleUrls: ['./emergency-information.component.css']
})
export class EmergencyInformationComponent {
  public profileTitle: string = 'medical_info';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  changeProfileTitle(title: string) {
    this.profileTitle = title;
  }

}
