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
}
