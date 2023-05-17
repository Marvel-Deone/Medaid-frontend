import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private uriseg = environment.baseUrl;

  constructor(private http: HttpClient) { }

  PostQuote(quote: any) {
    const URI = this.uriseg + '/quote';
    const token = JSON.parse(localStorage['token']);

    return this.http.post(URI, quote, { headers: { Authorization: `${token}` } }).pipe(map(response => {
      return response;
    }));
    // return this.http.post(`${this.uriseg}/quote/postquote`, quote)
  }
  Getquote() {
    return this.http.get(`${this.uriseg}/quote`,)
  }
}
