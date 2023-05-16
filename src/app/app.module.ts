import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergencyInformationComponent } from './emergency-information/emergency-information.component';
import {MatStepperModule} from '@angular/material/stepper';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './public/header/header.component';
import { SidebarComponent } from './public/sidebar/sidebar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogComponent } from './admin/blog/blog.component';
import { EmailVeryComponent } from './auth/email-very/email-very.component';
import { ChatContainerComponent } from './chat/chat-container/chat-container.component';
import { MessagecontainerComponent } from './chat/messagecontainer/messagecontainer.component';
import { SidebarsideComponent } from './chat/sidebarside/sidebarside.component';
import { RecommendedComponent } from './chunk_component/recommended/recommended.component';
import { PeertopeerDialogueComponent } from './dialogues/peertopeer-dialogue/peertopeer-dialogue.component';
import { MedicationReminderComponent } from './medication-reminder/medication-reminder.component';
import { PeertopeerComponent } from './peertopeer/peertopeer.component';
import { SelfAssesementComponent } from './self-assesement/self-assesement.component';
import { SosComponent } from './sos/sos.component';
// import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuoteuploadComponent } from './quoteupload/quoteupload.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TellmeComponent } from './tellme/tellme.component';
import { ExpertSigninComponent } from './auth/expert-signin/expert-signin.component';
import { ConsultationComponent } from './consultation/consultation.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    NotificationComponent,
    EmergencyInformationComponent,
    SidebarsideComponent,
    MessagecontainerComponent,
    ChatContainerComponent,
    EmailVeryComponent,
    RecommendedComponent,
    BlogComponent,
    SosComponent,
    PeertopeerDialogueComponent,
    PeertopeerComponent,
    SelfAssesementComponent,
    MedicationReminderComponent,
    TellmeComponent,
    QuoteuploadComponent,
    ExpertSigninComponent,
    ConsultationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    NzNotificationModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularEditorModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
