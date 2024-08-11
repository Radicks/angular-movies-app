import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieFilterComponent } from './components/movie-filter/movie-filter.component';
import { FormsModule } from '@angular/forms';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { ActorsFilterComponent } from './components/actors-filter/actors-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieFilterComponent,
    ActorsListComponent,
    ActorsFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
