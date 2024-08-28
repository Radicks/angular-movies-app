import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../services/models/person.model';
import { ActorsService } from '../services/actors.service';
import { ActorsFilterComponent } from '../components/actors-filter/actors-filter.component';
import { ActorModifyComponent } from '../actor-modify/actor-modify.component';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrl: './actors-list.component.css'
})
export class ActorsListComponent implements AfterViewInit{

  public people: Array<Person> = []
  public selectedPerson: Person | null = null;
  public isDetailModalClosed = true;
  public isEditModalClosed = true;

  @ViewChild(ActorsFilterComponent, {static: false})
  private actorsFilterRef!: ActorsFilterComponent;

  @ViewChild(ActorModifyComponent, {static: false})
  private actorEditRef!: ActorModifyComponent;

  constructor(private actorsService: ActorsService) {}
  
  ngAfterViewInit(): void {
    this.filter();
  }

  public filter() {
    if (this.actorsFilterRef.actorsFilter.role === 'actor') {
      this.actorsService.getActors(this.actorsFilterRef.actorsFilter).subscribe((data: Array<Person>) => {
        this.people = data;
      });
    } else {
      this.actorsService.getDirectors(this.actorsFilterRef.actorsFilter).subscribe((data: Array<Person>) => {
        this.people = data;
      });
    }
  }

  public removePerson() {
    if (confirm("Opravdu chcete odebrat tuto osobu?") && this.selectedPerson != null) {
      this.actorsService.removePerson(this.selectedPerson)
        .subscribe((result) => {
          this.filter();
        });
    }
  }

  public editPerson() {
    if (this.actorEditRef.formRef.form.valid && this.selectedPerson != null) {
      this.actorsService.editPerson(this.selectedPerson)
        .subscribe((result) => {
          this.isEditModalClosed = true;
          this.selectedPerson = null;
          this.filter();
        }, (error) => {
          console.log(error);
          alert(`Chyba: ${error.toLocaleString()}`);
        });
    }
  }
  
}
