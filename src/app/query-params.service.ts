import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  queryParams = {};

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.route.queryParamMap.subscribe(queryParams => {
      // tslint:disable-next-line:no-string-literal
      Object.assign(this.queryParams, queryParams['params']);
      // this.queryParams = queryParams['params'];
    });
  }

  updateQueryParams(param, value) {
    this.queryParams[param] = value;
    this.router.navigate(['/'], { queryParams: this.queryParams });
  }
}
