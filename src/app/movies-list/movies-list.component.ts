import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements AfterViewInit {

  movies: Array<Movie> = [];

  constructor(private readonly moviesService: MoviesService) {
  }


  ngAfterViewInit(): void {
    this.moviesService.getMovies()
      .subscribe(
        (movies: Array<Movie>) => this.movies = movies, // Podobné `then` metodě
        (error) => console.log(error), // Podobné `catch` metodě
        () => {} // Krajně podobné `complete` metodě. Tato funkce zde ani nemusí být, jelikož je prázdná.
      );
  }

}
