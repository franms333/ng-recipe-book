// ESTE ES UN EJEMPLO DE DYNAMIC COMPONENTS
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  // DE ESTA MANERA LOGRAMOS OBTENER EL MENSAJE DESDE AFUERA DE ESTE COMPONENTE
  @Input() message: string;

  // DE ESTA MANERA PODEMOS EMITIR UN EVENTO QUE COMUNICARÁ CUÁNDO EL USUARIO SE SALIÓ DEL MODAL
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  // CON ESTE EVENTO EMITIMOS CUANDO EL USUARIO DIÓ CLICK EN EL BOTÓN DE "CLOSE" O EN EL FONDO
  onClose(){
    this.close.emit();
  }
}
