import { Component, ViewChild } from '@angular/core';
import { ActorModifyComponent } from './actor-modify/actor-modify.component';
import { Router } from '@angular/router';
import { ActorsService } from './services/actors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'client';

  public isActorModalClosed = false;
    
  @ViewChild(ActorModifyComponent, {static: false})
  actorAddRef!: ActorModifyComponent;

  constructor(
    private actorsService: ActorsService,
    private router: Router
  ) {}

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
