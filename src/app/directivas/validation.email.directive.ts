import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS} from '@angular/forms';

function verificarEmail(c : AbstractControl){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(c.value)){
        return {correoCorrecto : true}
    }
    return null;
}

@Directive({
    selector : '[validar-correo]',
    providers : [
        {provide : NG_VALIDATORS, multi: true, useValue : verificarEmail }
    ]
})

export class ValidarCorreo {}