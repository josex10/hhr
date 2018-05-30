import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS} from '@angular/forms';

function verificarEspaciosVacios(c : AbstractControl){

    if (!c.value || typeof c.value === 'string' && !c.value.trim()) {
        return {
            requerido: true
        };
    }
  
    return null;
}

@Directive({
    selector : '[requerido]',
    providers : [
        {provide : NG_VALIDATORS, multi: true, useValue : verificarEspaciosVacios }
    ]
})

export class EspaciosRequeridos {}