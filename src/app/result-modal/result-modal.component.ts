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
    const myCanvas = document.getElementById('canvasCrop') as HTMLCanvasElement;
    const myContext = myCanvas.getContext('2d');
    const img = new Image();
    img.src = this.dataUrl;
    let that = this;
    img.onload = () => {
      if (!that.crop) {
        console.log(img.width, img.height, img.naturalWidth, img.naturalHeight);
        myContext.canvas.width = img.width;
        myContext.canvas.height = img.height;
        myContext.drawImage(img, 0, 0, img.width, img.height);
        myContext.save();
        //create a new data URL
        that.dataUrl = that.trimCanvas(myCanvas).toDataURL();
        const resultImgContainer = document.getElementById('result-img-container');
        img.style.width = '100%';
        img.src = that.dataUrl;
        resultImgContainer.appendChild(img);
        that.crop = true;
      }
    };
  }

  download() {
    const link = document.createElement('a');
    link.download = 'mustdo100.png';
    link.href = this.dataUrl;
    link.click();
  }

  trimCanvas(c) {
    // tslint:disable-next-line:no-var-keyword
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:one-variable-per-declaration
    var ctx = c.getContext('2d'),
        copy = document.createElement('canvas').getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
        }, x, y;
    // Iterate over every pixel to find the highest
    // and where it ends on every axis ()
    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % c.width;
            // tslint:disable-next-line:no-bitwise
            y = ~~((i / 4) / c.width);

            if (bound.top === null) {
                bound.top = y;
            }

            if (bound.left === null) {
                bound.left = x;
            } else if (x < bound.left) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }

    // Calculate the height and width of the content
    var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    // Return trimmed canvas
    return copy.canvas;
}

}
