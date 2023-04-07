import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'  },
  {path: 'sign-in', component: SignInComponent  },
  {path: 'sign-up', component: SignUpComponent  },
   {path: 'dashboard', component: DashboardComponent  },
   {path: 'notifications', component: NotificationComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
