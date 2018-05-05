import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global.services';
import { isUndefined } from 'util';
import { map } from 'rxjs/operator/map';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

constructor(private _http : Http) {}

fnLenguaje(lenguaje : string){

    var promise = new Promise((resolve, reject) => {
        //PASO #1 -> OBTENER LENGUAJE
        var lenguajeAlmacenado = localStorage.getItem('infinityLanguage');
        //PASO #2 -> VALIDAR QUE EL LENGUAJE ALMACENADO NO ESTE VACIO
        if(lenguajeAlmacenado == 'undefined' || lenguajeAlmacenado == null){
            if(lenguaje == "" || lenguaje == undefined){
                lenguaje = "ES";
                localStorage.setItem('infinityLanguage', lenguaje);
            }else{
                localStorage.setItem('infinityLanguage', lenguaje);
            } 
        }else{
            if(lenguaje == "" || lenguaje == undefined){
                //NA
            }else{
                if(lenguajeAlmacenado != lenguaje){
                    localStorage.setItem('infinityLanguage', lenguaje); 
                }
            }
            
        }
        lenguaje = localStorage.getItem('infinityLanguage');
        resolve(lenguaje);
    });

    return promise;

}// --> ./fnLenguaje

fnItemsDelNavbar(){
    
    var promise = new Promise((resolve, reject) => {
        var items = [
            {itemES: "Casas", itemEN: "Homes", url: "/homes"},
            {itemES: "Casas de lujo", itemEN: "Luxury Homes", url: "/luxury"},
            {itemES: "Contáctenos", itemEN: "Contact Us", url: "/contact"}
        ]
        resolve(items);
    });
    return promise;
}// --> ./fnItemsDelNavbar


/*
exampleGET(){
    var route = GLOBAL.url+'getAllProperty';

    let headers = new Headers({
        'Content-Type' : 'application/json'
    });
    return this._http.get(route, {headers : headers}).map(res => res.json());
}

examplePOST(code: string){
    var route = GLOBAL.url+'getSingleProperty';
    var params = JSON.stringify({
        "code" : code,
    });
    let headers = new Headers({
        'Content-Type' : 'application/json'
    });
    return this._http.post(route, params, {headers : headers}).map(res => res.json()); 
}
*/


fnElCampoEstaVacio(data){
    
    if(data === null || data === undefined){
      return true;
    }
    var emptySpace = 0;
    for(var i =0; i < data.length; i++){
      if(data[i] != " "){
        emptySpace++
      }
    }
    if(emptySpace == 0 ){
      return true;
    }
    return false;
}// --> ./fnElCampoEstaVacio

fnFormatoDeCorreoCorrecto(emailField){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailField);
}// --> ./fnFormatoDeCorreoCorrecto


fnSendEmail(name: string, phone: string, email: string, message : string){
    var route = GLOBAL.url+'sendSingleEmail';
    var params = JSON.stringify({
        'name' : name,
        'phone' : phone,
        'email' : email, 
        'message' : message
    });
    let headers = new Headers({
        'Content-Type' : 'application/json'
    });
    return this._http.post(route, params, {headers : headers}).map(res => res.json()); 
}// --> ./fnSendEmail

}// --> ./AppService
