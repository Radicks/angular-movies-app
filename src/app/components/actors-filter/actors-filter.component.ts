import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActorsFilter } from '../../services/models/actors-filter.model';
import { ActorsService } from '../../services/actors.service';

@Component({
  selector: 'app-actors-filter',
  templateUrl: './actors-filter.component.html',
  styleUrl: './actors-filter.component.css'
})
export class ActorsFilterComponent implements OnInit{
  
  actorsFilter = new ActorsFilter;

  @Output()
  public onFilter: EventEmitter<void> = new EventEmitter<void>

  constructor(private actorsService: ActorsService) { }

  public get roles() {
    return this.actorsService.roles;
  }
  
  ngOnInit(): void {
    this.actorsFilter.role = this.roles[0].key;
  }

}
