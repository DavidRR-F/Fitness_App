import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  
  @HostBinding('class.open') highlight = null;

  @HostListener('mouseenter') 
  onMouseEnter() {
    this.highlight('rgba(0,0,0,0)');
    console.log('work1');
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.highlight(null);
    console.log('work2');
  }

  constructor(private elRef: ElementRef) { }

}