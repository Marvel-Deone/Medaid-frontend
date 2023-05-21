import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private uriseg = environment.baseUrl;
  public responseItem: any;
  public header: any;
  constructor(private http: HttpClient) { }
  sendPin(cpin:any){
    return this.http.post(`${this.uriseg}/expert/sendpin`,cpin)
  }
  
  signup(data:any){
    return this.http.post(`${this.uriseg}/expert/signup`,data)
  }
  
  Login(inputdata: any) {
    const URI = this.uriseg + '/expert/login';   

    return this.http.post(URI, inputdata).pipe(map(response => {
     
      this.responseItem = response;
      localStorage.setItem('token', JSON.stringify(this.responseItem.token));
    }));
  }

  GetExpertUser(currentUser:any){
    return this.http.get(`${this.uriseg}/expert/allExpert/${currentUser}`);
  }
  getConsultRequest(data:any){
    return this.http.post(`${this.uriseg}/expert/getconsultrequest`,data)   
  }
  getPostAcceptedorRejected(data:any){
    return this.http.post(`${this.uriseg}/expert/getPostAccept`,data)   
  }

}
