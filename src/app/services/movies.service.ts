import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs";
import {Movie} from "./models/movie.model";
import { MovieFilter } from './models/movie-filter.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getMovies(movieFilter: MovieFilter): Observable<Array<Movie>> {
    let params = new HttpParams();
    for (const key in movieFilter) { // Projíždíme každou vlastnost modelu a přidáváme ji do httpParams, když není null.
      if (movieFilter.hasOwnProperty(key)) {
        const value = (movieFilter as any)[key];
        if (value !== null) {
          params = params.set(key, value.toString());
        }
      }
    }
  
    return this.httpClient.get<Array<Movie>>('/api/movies', {params});
  }

  getGenres(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>('/api/genres');
  }
}
