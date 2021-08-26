import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MustdoService {

  mustdo: any;

  constructor(private http: HttpClient) {
    this.getMustdo().subscribe(mustdo => {
      this.mustdo = mustdo;
    });
  }

  public getMustdo(): Observable<any> {
    return this.http.get('./assets/mustdo.json');
  }

  public getCoordinate(ques): string {
    const index = this.mustdo.questions.findIndex(q => q.id === ques.id);
    const row = parseInt((index / 6).toString(), 10);
    const col = index % 6;
    return `background-position: -${col * 133}px -${row * 133}px`;
  }

  public getCoordinate2(ques): string {
    const index = this.mustdo.questions2.findIndex(q => q.id === ques.id);
    const row = parseInt((index / 2).toString(), 10);
    const col = index % 2;
    return `background-position: -${col * 450}px -${row * 400}px`;
  }

  public getCoordinate3(ques): string {
    const index = this.mustdo.questions3.findIndex(q => q.id === ques.id);
    const row = parseInt((index / 6).toString(), 10);
    const col = index % 6;
    return `background-position: -${col * 133}px -${row * 133}px`;
  }

  public getCoordinate4(ques): string {
    const index = this.mustdo.questions4.findIndex(q => q.id === ques.id);
    const row = parseInt((index / 6).toString(), 10);
    const col = index % 6;
    return `background-position: -${col * 133}px -${row * 133}px`;
  }
}
