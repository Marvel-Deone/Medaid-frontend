import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uriseg = environment.baseUrl;
  public responseItem : any;

  constructor(private http: HttpClient) { }

  Register(inputdata: any) {
    const URI = this.uriseg + '/auth/register';

    return this.http.post(URI, inputdata).pipe(map(response => {
      console.log(response);
    }));
  }
  VerifyEmail(inputdata: any){
    const URI = this.uriseg + '/auth/verifyemail';
    return this.http.post(`${URI}`, 
      inputdata
    );
  }

  Login(inputdata: any) {
    const URI = this.uriseg + '/auth/login';

    return this.http.post(URI, inputdata).pipe(map(response => {
      console.log(response);
      this.responseItem = response;
      localStorage.setItem('token', JSON.stringify(this.responseItem.token));
    }));
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null
  }


  GetDashboard (token:any){
    return this.http.get(`${this.uriseg}/user/dashboard`,{
      headers:{
        "Authorization":`Bearer ${token}`,
        "Accept":"application/json",
        "content-Type":"application/json"
      }
    })

  }
  GetCurrentUser(currentUser:any){
    return this.http.get(`${this.uriseg}/user/currentuser/${currentUser}`);
  }
  GetAllUser(currentUser:any){
    return this.http.get(`${this.uriseg}/user/allUsers/${currentUser}`);
  }

  SendMessage(messageDetails:any){
   return this.http.post(`${this.uriseg}/messages/addmessage`,messageDetails)
  }


}
