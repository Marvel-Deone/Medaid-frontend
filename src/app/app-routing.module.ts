import { ChatContainerComponent } from './chat/chat-container/chat-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EmergencyInformationComponent } from './emergency-information/emergency-information.component';
import { EmailVeryComponent } from './auth/email-very/email-very.component';
import { BlogComponent } from './admin/blog/blog.component';

const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'  },
  {path: 'sign-in', component: SignInComponent  },
  {path: 'sign-up', component: SignUpComponent  },
  {path: 'email-verification', component: EmailVeryComponent },
   {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
   {path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard]  },
   {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
   {path: 'emergency-information', component: EmergencyInformationComponent, canActivate: [AuthGuard]  },
   {path: 'chat', component: ChatContainerComponent, canActivate: [AuthGuard] },
   {path: 'admin/blog', component: BlogComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
