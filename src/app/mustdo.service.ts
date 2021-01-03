import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MustdoService {

  constructor(private http: HttpClient) { }

  public getMustdo(): Observable<any> {
    return this.http.get('./assets/mustdo.json');
}
}
