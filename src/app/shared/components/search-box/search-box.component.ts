import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  //Desde esta forma no es necesario mandar el valor por referencia
  /* @ViewChild('txtSearchInput')
  public tagInput!:ElementRef<HTMLInputElement>;
 */
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  //recibe desde el html el txtSearchInput.value
  public emitValue(value:string):void{
    this.onValue.emit(value);
  }
}
