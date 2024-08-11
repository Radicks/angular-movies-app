import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../services/models/movie.model';
import { MovieFilterComponent } from '../components/movie-filter/movie-filter.component';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements AfterViewInit {

  @ViewChild(MovieFilterComponent, {static: false})
  private movieFilterRef!: MovieFilterComponent;

  movies: Array<Movie> = [];

  constructor(private readonly moviesService: MoviesService) { }

  ngAfterViewInit(): void {
    this.filter()
  }

  filter() {
    const movieFilter = this.movieFilterRef.movieFilter;
    this.moviesService.getMovies(movieFilter)
      .subscribe(
        (movies: Array<Movie>) => this.movies = movies,
        (error) => console.error(),
        () => {}
        );
  }
}



