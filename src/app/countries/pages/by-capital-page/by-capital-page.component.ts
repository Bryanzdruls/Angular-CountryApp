import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  private countries: Country[]=[];

  constructor(private countriesService:CountryService){}

  public get getCountries(){
    return [...this.countries]
  }

  public setCountries(countries: Country[]){
    this.countries = countries;
  }

  public searchByCapital(term: string): void {
    this.countriesService.searchCapital(term)
      .subscribe(countries =>{
          this.setCountries(countries);
      });

  }
}
