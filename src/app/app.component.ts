import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MustdoService } from './mustdo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mustdo100';
  mustdo: any;
  queryParams = {};
  // 1: home
  // 2: name
  // 3: list
  // 4: result
  step = 4;

  constructor(
    public mustdoService: MustdoService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.mustdo = await this.mustdoService.getMustdo().toPromise();
    this.route.queryParamMap.subscribe(queryParams => {
      // tslint:disable-next-line:no-string-literal
      Object.assign(this.queryParams, queryParams['params']);
      // this.queryParams = queryParams['params'];
    });

  }

  next(quesId, result): void {
    this.queryParams[quesId] = result;
    this.router.navigate(['/'], { queryParams: this.queryParams });
  }

  nextStep() {
    this.step ++;
  }

}
