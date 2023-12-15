import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/Country';

@Injectable({providedIn: 'root'})
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) { }


  public searchCountryByAlphaCode( code: string):Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length>0 ? countries[0]: null),
        catchError( error =>{
          console.error(error);
          return of(null)
        })
      );
  }

  public searchCapital( query: string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${query}`)
      .pipe(
        catchError( error =>{
          console.error(error);
          return of([])
        })
      );
  }
  public searchCountry( query: string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/name/${query}`)
      .pipe(
        catchError( error =>{
          console.error(error);
          return of([])
        })
      );
  }
  public searchRegion( query:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/region/${query}`)
  }
}
