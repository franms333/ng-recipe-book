import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  // "viewContainerRef" NOS PERMITE ACCEDER A UN ELEMENTO EN ESPECÍFICO
  constructor(public viewContainerRef: ViewContainerRef) { }

}
