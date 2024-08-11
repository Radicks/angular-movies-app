import { Component, EventEmitter, Output } from '@angular/core';
import { MovieFilter } from '../../services/models/movie-filter.model';
import { Person } from '../../services/models/person.model';
import { MoviesService } from '../../services/movies.service';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.css'
})
export class MovieFilterComponent {

  @Output()
  public onFilter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly actorsService: ActorsService,
    private readonly moviesService: MoviesService) 
    {}

  movieFilter = new MovieFilter();

  public directors: Array<Person> = [];
  public actors: Array<Person> = [];
  public genres: Array<string> = [];

  ngOnInit(): void {
    this.actorsService.getActors()
      .subscribe((actors) => this.actors = actors);
  
    this.actorsService.getDirectors()
      .subscribe((directors) => this.directors = directors);
  
    this.moviesService.getGenres()
      .subscribe((genres) => this.genres = genres);
  }
}
