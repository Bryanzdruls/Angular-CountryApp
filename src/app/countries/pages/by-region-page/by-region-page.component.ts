import { Component } from '@angular/core';
import { Country } from '../../interfaces/Country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  private countries:Country[]= [];
  constructor( private countrieService:CountryService){

  };
  public get getCountries(){
    return [...this.countries];
  }
  public setCountries(countries:Country[]){
    return this.countries = countries;
  }

  public searchByRegion(term:string){
    this.countrieService.searchRegion(term)
      .subscribe(countries =>{
        this.setCountries(countries);
      })
  }
}
