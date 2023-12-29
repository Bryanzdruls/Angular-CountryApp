import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/Country';
import { CacheStore } from '../interfaces/cacheStore.interface';
import { Region } from '../interfaces/Region.type';

@Injectable({providedIn: 'root'})
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore= {
    byCapital:  {term:'', countries:[]},
    byCountry:  {term:'', countries:[]},
    byRegion:   {region:'', countries:[]},

  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private getCountriesRequest( url:string ):Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( ( ) => of([])),
        delay(500)
      );
  }
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

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

  public searchCapital( term: string):Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries=>this.cacheStore.byCapital = {term, countries}),
        tap( () => this.saveToLocalStorage())
      );
  }
  public searchCountry( query: string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/name/${query}`)
      .pipe(
        tap( countries=>this.cacheStore.byCountry = {term: query, countries}),
        tap( () => this.saveToLocalStorage()),
        catchError( error =>{
          console.error(error);
          return of([])
        })
      );
  }
  public searchRegion( query:Region):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/region/${query}`)
      .pipe(
        tap( countries=>this.cacheStore.byRegion = {region: query, countries}),
        tap( () => this.saveToLocalStorage())
      )
  }
}
