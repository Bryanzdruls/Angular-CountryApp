import { Component } from '@angular/core';
import { Country } from '../../interfaces/Country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  private countries: Country[]=[];

  constructor(private countriesService:CountryService){}

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
      });

  }
}
