import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MedicationReminderService {

  private uriseg = environment.baseUrl;
  header: any;
  medication: any;
  reminder: any;

  constructor(private http: HttpClient) { }

  createMedication(inputdata: any) {
    const URI = this.uriseg + '/medication';
    const token = JSON.parse(localStorage['token']);

    return this.http.post(URI, inputdata, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }

  getMedication() {
    const URI = this.uriseg + '/medication';
    const token = JSON.parse(localStorage['token']);

    return this.http.get(URI, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      this.medication = response;
      return this.medication;
    }));
  }

  createReminder(inputdata: any) {
    const URI = this.uriseg + '/reminder';
    const token = JSON.parse(localStorage['token']);

    return this.http.post(URI, inputdata, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
  }

  getReminder() {
    const URI = this.uriseg + '/reminder';
    const token = JSON.parse(localStorage['token']);

    return this.http.get(URI, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      this.reminder = response;
      return this.reminder;
    }));
  }
}
