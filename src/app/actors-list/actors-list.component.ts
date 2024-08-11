import { Component, OnInit } from '@angular/core';
import { Person } from '../services/models/person.model';
import { ActorsService } from '../services/actors.service';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrl: './actors-list.component.css'
})
export class ActorsListComponent implements OnInit{

  public directors: Array<Person> = []

  constructor(private actorsService: ActorsService) {}

  ngOnInit(): void {
    this.actorsService.getDirectors().subscribe((directors) => {
      this.directors = directors;
    })
  }

}
