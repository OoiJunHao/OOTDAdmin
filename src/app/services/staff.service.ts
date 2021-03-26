import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Staff } from "../models/staff";
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  baseUrl = '/api/Subscriber';

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }
}

staffLogin(username: string, password: string): Observable < Staff > {
  return this.httpClient.get<Staff>(this.baseUrl + "/staffLogin?username=" + username + "&password=" + password).pipe {
  catchError(this.handleError);
}
}
