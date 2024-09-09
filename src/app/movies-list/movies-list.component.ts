import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../services/models/movie.model';
import { MovieFilterComponent } from '../components/movie-filter/movie-filter.component';
import { ActorsService } from '../services/actors.service';
import { Person } from '../services/models/person.model';
import { MovieModifyComponent } from '../movie-modify/movie-modify.component';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements AfterViewInit {

  @ViewChild(MovieFilterComponent, {static: false})
  private movieFilterRef!: MovieFilterComponent;

  public selectedMovieDirector: string | null = null;
  public selectedMovieActors: string[] = [];
  public selectedMovie: Movie | null = null;

  public isDetailModalClosed: boolean = true;
  public isEditModalClosed: boolean = true;
  @ViewChild(MovieModifyComponent, {static: false})
  private movieEditRef!: MovieModifyComponent;

  movies: Array<Movie> = [];

  constructor(
    private readonly moviesService: MoviesService,
    private readonly actorsService: ActorsService
  ) { }

  public showDetail() {
    if (this.selectedMovie == null) return;

    this.actorsService.getPerson(this.selectedMovie.directorID).subscribe((data: Person) => {
      this.selectedMovieDirector = data.name;
    });

    this.selectedMovieActors = [];
    this.selectedMovie.actorIDs.forEach(item => {
      this.actorsService.getPerson(item).subscribe((data: Person) => {
        this.selectedMovieActors.push(data.name);
      });
    });
    this.isDetailModalClosed = false;
  }

  public editMovie() {
    if (this.selectedMovie == null) return;

    if (this.movieEditRef.formRef.form.valid) {
      this.moviesService.editMovie(this.selectedMovie)
      .subscribe((result) => {
        this.isEditModalClosed = true;
        this.selectedMovie = null;
        this.filter();
      }, (error) => {
        alert(`Chyba: ${error.toLocaleString()}`);
      });
    }
  }

  public removeMovie() {
    if (confirm("Opravdu chcete odebrat tento film?") && this.selectedMovie != null) {
      this.moviesService.removeMovie(this.selectedMovie)
      .subscribe((data) => {
        this.filter();
      })
    }
  }

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



