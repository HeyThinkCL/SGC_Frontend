import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class CountriesService {
  static get parameters(){
    return [[Http]]
  }
  private countriesUrl = 'https://restcountries.eu/rest/v1/all';

  constructor(private http: Http) {
    this.http=http;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  getCountries(){
    return this.http.get(this.countriesUrl)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
