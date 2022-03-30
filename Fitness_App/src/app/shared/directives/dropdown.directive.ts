import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDrowpdown]'
})
export class DrowpdownDirective {
  
  @HostBinding('class.open') isOpen = false;
  
  // opens on button click closes on document click (anywere in app)
  @HostListener('document:click', ['$event']) toggleOpen(event: Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) { }

}