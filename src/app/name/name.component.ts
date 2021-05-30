import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QueryParamsService } from '../query-params.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  name: string;
  country: string;

  constructor(
    private queryParamsService: QueryParamsService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.name) {
      this.queryParamsService.updateQueryParams('name', this.name);
      this.queryParamsService.updateQueryParams('country', this.country);
      this.nextStep.emit(true);
    }
  }

}
