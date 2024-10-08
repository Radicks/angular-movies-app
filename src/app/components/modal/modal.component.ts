import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  @Input()
  header = "Modal";

  @Input()
  isClosed = true;

  @Output()
  crossClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
