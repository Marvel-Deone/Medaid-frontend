import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './public/sidebar/sidebar.component';
import { HeaderComponent } from './public/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { EmergencyInformationComponent } from './emergency-information/emergency-information.component';

import { SidebarsideComponent } from './chat/sidebarside/sidebarside.component';
import { MessagecontainerComponent } from './chat/messagecontainer/messagecontainer.component';
import { ChatContainerComponent } from './chat/chat-container/chat-container.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmailVeryComponent } from './auth/email-very/email-very.component';
import { RecommendedComponent } from './chunk_component/recommended/recommended.component';
import { BlogComponent } from './admin/blog/blog.component';
import { SosComponent } from './sos/sos.component';
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
    MatButtonModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
