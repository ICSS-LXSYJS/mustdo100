import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MustdoService } from './mustdo.service';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultModalComponent } from './result-modal/result-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mustdo100';
  mustdo: any;
  total = 0;
  progress = 0;
  queryParams = {};
  current: any;
  mode: 'fill' | 'result' = 'fill';
  result = [];

  constructor(
    public mustdoService: MustdoService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.mustdo = await this.mustdoService.getMustdo().toPromise();
    this.current = this.mustdo.questions[0];
    this.total = this.mustdo.questions.length;
    this.route.queryParamMap.subscribe(queryParams => {
      // tslint:disable-next-line:no-string-literal
      Object.assign(this.queryParams, queryParams['params']);
      this.progress = queryParams.keys.length / this.total * 100;
      if (this.progress !== 100) {
        this.current = this.mustdo.questions[queryParams.keys.length];
      } else {
        this.mode = 'result';
        this.generateResult();
      }
    });

  }

  next(result): void {
    this.queryParams[this.current.id] = result;
    this.router.navigate(['/'], { queryParams: this.queryParams });
  }

  generateResult() {
    for (const [key, value] of Object.entries(this.queryParams)) {
      if (value === '1') {
        const id = parseInt(key, 10);
        const question = this.mustdo.questions.find(q => q.id === id);
        if (question) {
          this.result.push(question);
        }
      }
    }
  }

  html2image() {
    const node = document.getElementById('result-container');
    console.log(node);

    htmlToImage.toPng(node)
      .then((dataUrl) => {
        const modalRef = this.modalService.open(ResultModalComponent, {
          size: 'xl'
        });
        modalRef.componentInstance.dataUrl = dataUrl;
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

}
