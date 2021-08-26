import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MustdoService } from '../mustdo.service';
import { QueryParamsService } from '../query-params.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public mustdoSerivce: MustdoService,
    public queryParamsService: QueryParamsService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.scroll();
    }, 100);
  }

  scroll() {
    const autoScrollList = document.getElementById('auto-scroll-list');
    if (autoScrollList && autoScrollList.scrollTop < autoScrollList.scrollHeight) {
      autoScrollList.scrollTop += 1;
    }
  }

  ifSelect(quesId) {
    if (this.queryParamsService.queryParams &&
      this.queryParamsService.queryParams[quesId] &&
      this.queryParamsService.queryParams[quesId] === '1') {
      return true;
    }
    return false;
  }

  select(quesId) {
    this.queryParamsService.updateQueryParams(quesId,
      this.ifSelect(quesId) ? 0 : 1);
  }

  get numOfSelected() {
    let retVal = 0;
    if (this.queryParamsService.queryParams) {
      for (const [param, value] of Object.entries(this.queryParamsService.queryParams)) {
        if (param !== 'name' && value === '1') {
          retVal ++;
        }
      }
    }
    return retVal;
  }

}
