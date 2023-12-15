import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/Country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent  implements OnInit{
  public country?: Country;
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private countrieService:CountryService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( params => this.countrieService.searchCountryByAlphaCode(params['id'])),
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }
        return this.country = country;
      })
  }

  //Otra forma de hacerlo
  /* public searchByAlphaCode(params:string){
    this.countrieService.searchCountryByAlphaCode(params)
      .subscribe( country =>{
        console.log(country);
      })
  } */

}
