import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../services/models/person.model';
import { ActorsService } from '../services/actors.service';
import { ActorsFilterComponent } from '../components/actors-filter/actors-filter.component';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrl: './actors-list.component.css'
})
export class ActorsListComponent implements AfterViewInit{

  public people: Array<Person> = []

  @ViewChild(ActorsFilterComponent, {static: false})
  private actorsFilterRef!: ActorsFilterComponent;

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

  

}
