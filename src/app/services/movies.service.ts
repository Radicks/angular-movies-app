import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getMovies(): Observable<Array<Movie>> {
    return this.httpClient.get<Array<Movie>>('/api/movies');
  }
}
