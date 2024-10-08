import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';
import { Role } from './models/role.model';
import { ActorsFilter } from './models/actors-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private readonly httpClient: HttpClient) {
  }

  get roles() {
    return [
      new Role("actor", "Actor"),
      new Role("director", "Director"),
    ];
  }

  getActors(filter: ActorsFilter): Observable<Array<Person>> {
    return this.httpClient.get<Array<Person>>('/api/actors',
      {params: this.getHttpParams(filter)}
    );
  }

  getDirectors(filter: ActorsFilter): Observable<Array<Person>> {
    return this.httpClient.get<Array<Person>>('/api/directors',
      {params: this.getHttpParams(filter)}
    );
  }

  getPerson(id: string): Observable<Person> {
    return this.httpClient.get<Person>(`/api/people/${id}`);
  }

  private getHttpParams(filter: ActorsFilter): HttpParams {
    let params = new HttpParams();

    if (filter != null  && filter.limit !== null) {
      params = params.set('limit', filter.limit.toString());
    }

    return params;
  }

  addPerson(actor: Person | null) {
    return this.httpClient.post(`/api/people`, actor)
  }

  removePerson(person: Person) {
    return this.httpClient.delete(`/api/people/${person._id}`);
  }

  editPerson(person: Person) {
    const body = {
      name: person.name,
      birthDate: person.birthDate,
      country: person.country,
      biography: person.biography,
      role: person.role
    };

    return this.httpClient.put(`/api/people/${person._id}`, body);
  }
}
