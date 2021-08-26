import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import * as html2canvas from 'html2canvas';
import { MustdoService } from '../mustdo.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() queryParams = {};
  @Input() mustdo: any;
  result = [];
  result2 = [];
  name = '';
  country = '';
  dataUrl = '';

  constructor(
    private modalService: NgbModal,
    public mustdoSerivce: MustdoService
  ) { }

  ngOnInit(): void {
    this.generateResult();
  }

  generateResult() {
    console.log(this.mustdo);
    for (const [key, value] of Object.entries(this.queryParams)) {
      if (key === 'name') {
        this.name = value as string;
      } else if (key === 'country') {
        this.country = value as string;
      }
      if (value === '1') {
        const id = parseInt(key, 10);
        let question = this.mustdo.questions.find(q => q.id === id);
        if (question) {
          this.result.push(question);
        }
        question = this.mustdo.questions2.find(q => q.id === id);
        if (question) {
          this.result2.push(question);
        }
      }
    }
  }

  html2image() {
    const node = document.getElementById('result-container');
    console.log(node);

    // htmlToImage.toPng(node)
    //   .then((dataUrl) => {
    //     const modalRef = this.modalService.open(ResultModalComponent, {
    //       size: 'xl'
    //     });
    //     modalRef.componentInstance.dataUrl = dataUrl;
    //   })
    //   .catch((error) => {
    //     console.error('oops, something went wrong!', error);
    //   });

    html2canvas(node).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const modalRef = this.modalService.open(ResultModalComponent, {
        size: 'xl'
      });
      modalRef.componentInstance.dataUrl = imgData;
    });
  }

}
