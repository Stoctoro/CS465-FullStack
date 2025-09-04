import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage) { }
  private url = 'http://localhost:3000/api/trips';
  private apiBaseUrl = 'http://localhost:3000/api/';
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    });
  }

  getTrip(tripCopde: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCopde);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    });
  }
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall(urlPath: string, user: User):
    Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return (await lastValueFrom(this.http.post(url, user))) as AuthResponse;
  }
}