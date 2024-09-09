import {Component, ViewChild} from '@angular/core';
import {ActorModifyComponent} from "./actor-modify/actor-modify.component";
import {ActorsService} from "./services/actors.service";
import {Router} from "@angular/router";
import {MovieModifyComponent} from "./movie-modify/movie-modify.component";
import {MoviesService} from "./services/movies.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  public isActorModalClosed = true;
  public isMovieModalClosed = true;

  @ViewChild(ActorModifyComponent, {static: false})
  actorAddRef!: ActorModifyComponent;

  @ViewChild(MovieModifyComponent, {static: false})
  movieAddRef!: MovieModifyComponent;

  constructor(
    private actorsService: ActorsService,
    private moviesService: MoviesService,
    private router: Router
  ) { }

  public addMovie() {
    if (this.movieAddRef.movie != null && this.movieAddRef.valid) {
      this.moviesService.addMovie(this.movieAddRef.movie)
        .subscribe((response) => {
          this.router.onSameUrlNavigation = 'reload';
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this.actorAddRef.formRef.resetForm();
          this.isMovieModalClosed = true;
          this.router.navigate(['/movies-list']);
        }, (error) => {
          alert('Chyba: ' + error.toString());
        });
    }
  }

  public addActor() {
    if (this.actorAddRef.valid) {
      this.actorsService.addPerson(this.actorAddRef.actor)
        .subscribe(
          (response) => {
            this.router.onSameUrlNavigation = 'reload'; //Vynutí angular zavolat ngAfterViewInit
            this.router.routeReuseStrategy.shouldReuseRoute = function () { //Vynutí angular zavolat ngAfterViewInit
              return false;
            }
            this.actorAddRef.formRef.resetForm(); //Reset formuláře
            this.isActorModalClosed = true;
            this.router.navigate(['/actors-list']);
          }, (error) => {
            alert('Chyba: ' + error.toLocaleString());
          }
        );
    }
  }
}