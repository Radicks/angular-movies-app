import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getActors(): Observable<Array<Person>> {
    return this.httpClient.get<Array<Person>>('/api/actors');
  }

  getDirectors(): Observable<Array<Person>> {
    return this.httpClient.get<Array<Person>>('/api/directors');
  }
}
