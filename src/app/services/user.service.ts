import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uriseg = environment.baseUrl;
  public responseItem: any;
  public header: any;
  userProfile: any;
  public currentChatPicked: any
  sosContact: any;
  expertProfile: any;

  constructor(private http: HttpClient) { }
  checkUniqueDetailsandsendMail(inputdata:any){
    const URI = this.uriseg + '/auth/sendVerificationPin';
    return this.http.post(URI, inputdata)
  }
  Register(inputdata: any) {
    const URI = this.uriseg + '/auth/register';

    return this.http.post(URI, inputdata).pipe(map(response => {
      return response;
    }));
  }

  VerifyEmail(inputdata: any) {
    const URI = this.uriseg + '/auth/verifyemail';
    return this.http.post(URI, inputdata)
 
  }

  Login(inputdata: any) {
    const URI = this.uriseg + '/auth/login';

    return this.http.post(URI, inputdata).pipe(map(response => {
      this.responseItem = response;
      localStorage.setItem('token', JSON.stringify(this.responseItem.token));
    }));
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null
  }

  GetProfile() {
    const URI = this.uriseg + '/user/profile';
    const token = JSON.parse(localStorage['token']);
    this.header = { headers: { Authorization: `${token}` } };


    return this.http.get(URI, this.header).pipe(map(response => {
      this.userProfile = response;
      return this.userProfile;
    }));
  }
  GetProfileExpert() {
    const URI = this.uriseg + '/user/expertprofile';
    const token = JSON.parse(localStorage['token']);
    this.header = { headers: { Authorization: `${token}` } };


    return this.http.get(URI, this.header).pipe(map(response => {
      this.expertProfile = response;
      return this.expertProfile;
    }));
  }

 

  UpdateProfile(inputdata: any) {
    const URI = this.uriseg + '/user/updateProfile';
    const token = JSON.parse(localStorage['token']);
    this.header = { headers: { Authorization: `${token}` } };

    return this.http.post(URI, inputdata, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }


  GetDashboard(token: any) {
    return this.http.get(`${this.uriseg}/user/dashboard`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "content-Type": "application/json"
      }
    })
  }

  GetCurrentUser(currentUser: any) {
    return this.http.get(`${this.uriseg}/user/currentuser/${currentUser}`);
  }
  GetAllUser(currentUser: any) {
    return this.http.get(`${this.uriseg}/user/allUsers/${currentUser}`);
  }

  SendMessage(messageDetails: any) {
    return this.http.post(`${this.uriseg}/messages/addmessage`, messageDetails)
  }
  GetAllMessages(messageDetails: any) {
    return this.http.post(`${this.uriseg}/messages/getallmessages`, messageDetails)
  }

  GetNotification(){
    return this.http.get(`${this.uriseg}/user/getNotification`,)
  }

  createSosContact(inputdata: any) {
    const URI = this.uriseg + '/sosContact';
    const token = JSON.parse(localStorage['token']);

    return this.http.post(URI, inputdata, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }

  getSosContact() {
    const URI = this.uriseg + '/sosContact';
    const token = JSON.parse(localStorage['token']);

    return this.http.get(URI, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      this.sosContact = response;
      return this.sosContact;
    }));
  }

  getSingleSosContact(id:any) {
    const URI = this.uriseg + '/sosContact/' + id;
    const token = JSON.parse(localStorage['token']);

    return this.http.get(URI, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }

  updateSosContact(inputdata: any, id:any) {
    const URI = this.uriseg + '/sosContact/updatesosContact/' + id;
    const token = JSON.parse(localStorage['token']);

    return this.http.patch(URI, inputdata, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }

  deleteSosContact(id:any) {
    const URI = this.uriseg + '/sosContact/deletesosContact/' + id;
    const token = JSON.parse(localStorage['token']);

    return this.http.delete(URI, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }

  


  
  // PostQuote(quote: any) {
  //   return this.http.post(`${this.uriseg}/quote/postquote`, quote)
  // }
  // Getquote() {
  //   return this.http.get(`${this.uriseg}/quote/getpost`,)
  // }
}
