import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './admin/blog/blog.component';
import { AuthGuard } from './auth/auth.guard';
import { EmailVeryComponent } from './auth/email-very/email-very.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
// import { ChatContainerComponent, ChatContainerComponent } from './chat/chat-container/chat-container.component';
import { ChatContainerComponent } from './chat/chat-container/chat-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergencyInformationComponent } from './emergency-information/emergency-information.component';
import { MedicationReminderComponent } from './medication-reminder/medication-reminder.component';
import { NotificationComponent } from './notification/notification.component';
import { PeertopeerComponent } from './peertopeer/peertopeer.component';
import { ProfileComponent } from './profile/profile.component';
import { QuoteuploadComponent } from './quoteupload/quoteupload.component';
import { SelfAssesementComponent } from './self-assesement/self-assesement.component';
import { SosComponent } from './sos/sos.component';
import { TellmeComponent } from './tellme/tellme.component';
import { ExpertSigninComponent } from './auth/expert-signin/expert-signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'email-verification', component: EmailVeryComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'emergency-information', component: EmergencyInformationComponent, canActivate: [AuthGuard] },
  // { path: 'chat', component: ChatContainerComponent, canActivate: [AuthGuard] },
  { path: 'admin/blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'sos', component: SosComponent, canActivate: [AuthGuard] },
  { path: 'self-assessement', component: SelfAssesementComponent, canActivate: [AuthGuard] },
  { path: 'peertopeer/:id', component: PeertopeerComponent, canActivate: [AuthGuard] },
  { path: 'medication-reminder', component: MedicationReminderComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatContainerComponent, canActivate: [AuthGuard] },
  { path: 'tellme', component: TellmeComponent, canActivate: [AuthGuard] },
  { path: 'uploadquote', component: QuoteuploadComponent, },
  { path: 'expert/signin', component: ExpertSigninComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
