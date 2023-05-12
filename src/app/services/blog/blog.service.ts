import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private uriseg = environment.baseUrl;
  header: any;

  constructor(private http: HttpClient) { }

  blog(inputdata: any) {
    const URI = this.uriseg + '/blog';
    const token = JSON.parse(localStorage['token']);

    return this.http.post(URI, inputdata, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }
}
