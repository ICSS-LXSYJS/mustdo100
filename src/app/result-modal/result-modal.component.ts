import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss']
})
export class ResultModalComponent implements OnInit {

  @Input() dataUrl;

  crop = false;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    const img = new Image();
    img.src = this.dataUrl;
    const resultImgContainer = document.getElementById('result-img-container');
    img.style.width = '100%';
    resultImgContainer.appendChild(img);
  }

  download() {
    const link = document.createElement('a');
    link.download = 'mustdo100.png';
    link.href = this.dataUrl;
    link.click();
  }

}
