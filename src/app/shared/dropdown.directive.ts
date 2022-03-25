import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
@HostBinding('class.open') isOpen = false;

// DE ESTA MANERA SE HACE QUE LOS DROPDOWN MENU SE CIERREN AL MOMENTO DE ABRIR OTRO DROPWDOWN
@HostListener('document:click', ['$event']) toggleOpen(event: Event){
  this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // this.isOpen = !this.isOpen;
}
  constructor(private elementRef: ElementRef) { }

}
