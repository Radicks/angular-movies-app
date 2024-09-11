import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieFilterComponent } from './components/movie-filter/movie-filter.component';
import { FormsModule } from '@angular/forms';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { ActorsFilterComponent } from './components/actors-filter/actors-filter.component';
import { ModalComponent } from './components/modal/modal.component';
import { ActorModifyComponent } from './actor-modify/actor-modify.component';
import { MovieModifyComponent } from './movie-modify/movie-modify.component';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieFilterComponent,
    ActorsListComponent,
    ActorsFilterComponent,
    ModalComponent,
    ActorModifyComponent,
    MovieModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
    /* provideHttpClient() */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
