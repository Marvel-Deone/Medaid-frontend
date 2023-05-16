import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SelfAssessmentService {

  private uriseg = environment.baseUrl;
  header: any;
  selfAssessment: any;

  constructor(private http: HttpClient) { }

  postSelfAssessment(inputdata: any) {
    const URI = this.uriseg + '/selfAssessment';
    const token = JSON.parse(localStorage['token']);

    return this.http.post(URI, inputdata, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }

  getSelfAssessment() {
    const URI = this.uriseg + '/selfAssessment';
    const token = JSON.parse(localStorage['token']);

    return this.http.get(URI, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      this.selfAssessment = response;
      return this.selfAssessment;
    }));
  }

}
