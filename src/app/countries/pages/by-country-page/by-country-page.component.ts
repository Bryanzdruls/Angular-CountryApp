import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/Country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit{
  private countries: Country[]=[];

  public initialValue:string = '';

  constructor(private countriesService:CountryService){}

  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
    this.countries = this.countriesService.cacheStore.byCountry.countries;
  }
  private isLoading = true;

  public get getIsLoading(){
    return this.isLoading;
  }
  public setIsLoading(bool:boolean){
    this.isLoading = bool;
  }

  public get getCountries(){
    return [...this.countries]
  }

  public setCountries(countries: Country[]){
    this.countries = countries;
  }

  public searchByCountry(term: string): void {
    this.countriesService.searchCountry(term)
      .subscribe(countries =>{
          this.setCountries(countries);
          this.setIsLoading(false);
      });

  }
}
