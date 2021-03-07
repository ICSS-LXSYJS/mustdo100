import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MustdoService } from '../mustdo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public mustdoSerivce: MustdoService
  ) { }

  ngOnInit(): void {
  }

}
