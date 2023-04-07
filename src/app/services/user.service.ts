import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uriseg = environment.baseUrl;

  constructor(private http: HttpClient) { }

  Register(inputdata: any) {
    const URI = this.uriseg + '/auth/register';

    return this.http.post(URI, inputdata).pipe(map(response => {
      console.log(response);
    }));
  }

  Login(inputdata: any) {
    const URI = this.uriseg + '/auth/login';

    return this.http.post(URI, inputdata).pipe(map(response => {
      console.log(response);
      // localStorage.setItem('token', JSON.stringify(response));
    }));
  }
}
