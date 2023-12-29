import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/Country';
import { CountryService } from '../../services/countries.service';
import { Region } from '../../interfaces/Region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit{
  private countries:Country[]= [];
  private regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public selectedRegion?: Region;

  constructor( private countriesService:CountryService){

  }
  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  private isLoading = true;

  public get getIsLoading(){
    return this.isLoading;
  }
  public setIsLoading(bool:boolean){
    this.isLoading = bool;
  }
  public get getCountries(){
    return [...this.countries];
  }
  public setCountries(countries:Country[]){
    return this.countries = countries;
  }

  public get getRegions(){
    return [...this.regions];
  }
  public setRegions(regions:Region[]){
    return this.regions = regions;
  }
  public searchByRegion(region:Region){
    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe(countries =>{
        this.setCountries(countries);
        this.setIsLoading(false)
      })
  }
}
