import { Component, Input, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit{

  private countries: Country[]=[];

  public initialValue:string = '';

  constructor(private countriesService:CountryService){}

  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
    this.countries = this.countriesService.cacheStore.byCapital.countries;
  }

  public get getCountries(){
    return [...this.countries]
  }

  public setCountries(countries: Country[]){
    this.countries = countries;
  }

  private isLoading = true;

  public get getIsLoading(){
    return this.isLoading;
  }
  public setIsLoading(bool:boolean){
    this.isLoading = bool;
  }
  public searchByCapital(term: string): void {
    this.countriesService.searchCapital(term)
      .subscribe(countries =>{
          this.setCountries(countries);
          this.setIsLoading(false);
      });
  }
}
