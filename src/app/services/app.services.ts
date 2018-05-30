import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { map } from 'rxjs/operator/map';
import 'rxjs/Rx';

import { GLOBAL } from './global.services';


@Injectable()
export class AppService {

    public lenguaje : string = "ES";
    public url : string;

    constructor(private _Http : Http) {
        this.url = GLOBAL.url;
    }

    fnInicializarLenguaje():void{
        this.lenguaje = "ES";
    }
    fnObtenerLenguaje(): string{
        return this.lenguaje;
        
    }

    fnCambiarLenaguaje(nuevoLenguaje : string) : void{
        this.lenguaje = nuevoLenguaje;
    }

    agregarUsuarioEnLocalStorage(email: string, token : string){
        localStorage.setItem('userHHR', JSON.stringify({email: email, token: token}));
        return true;
    }
    
    solicitarUsuarioEnLocalStorage(){
        var userFound = localStorage.getItem('userHHR');
        if(userFound != null){
          if(userFound != ""){
            return JSON.parse(userFound);
          }else{
            return false;
          }
        }else{
          return false;
        }
    }
    
    fnCerrarSesion(){
        localStorage.setItem('userHHR', "");
        return true;
    }

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
        return this._Http.post(route, params, {headers : headers}).map(res => res.json()); 
    }
    */

    fnLogin(email : string, password: string){
        var route = this.url+'login';
        var params = JSON.stringify({
            "email" : email,
            'password' : password,
            'gethash' : 1
        });
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this._Http.post(route, params, {headers : headers}).map(res => res.json()); 
    }

    fnAddClient(name : string, surname : string,company : string, position: string, phone: string, celphone: string, email: string,  alternativeEmail: string, notes: string, token : string){
        console.log("Token received: " + token);
        var route = this.url+'createClient';
        var params = JSON.stringify({
            "name" : name,
            'surname' : surname,
            'company' : company, 
            'position' : position,
            "phone" : phone,
            'celphone' : celphone,
            'email' : email, 
            "alternativeEmail" : alternativeEmail,
            'notes' : notes
        });
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token,
        });
        return this._Http.post(route, params, {headers : headers}).map(res => res.json()); 
    }

    fnGetAllClients(token : string){
        var route = this.url+'getAllClients';
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token,
        });
        return this._Http.get(route, {headers : headers}).map(res => res.json());
    }

    fnDeleteClient(email: string, token : string){
        var route = this.url+'removeClient';
        var params = JSON.stringify({
            'email' : email
        });
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });
        return this._Http.post(route, params, {headers : headers}).map(res => res.json()); 
    }

    fnGetClient(email: string, token : string){
        var route = this.url+'GetClient';
        var params = JSON.stringify({
            'email' : email
        });
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token
        });
        return this._Http.post(route, params, {headers : headers}).map(res => res.json()); 
    }

    fnUpdateClient(_id : string, name : string, surname : string,company : string, position: string, phone: string, celphone: string, email: string,  alternativeEmail: string, notes: string, token : string){
        var route = this.url+'updateClient';
        var params = JSON.stringify({
            "_id" : _id,
            "name" : name,
            'surname' : surname,
            'company' : company, 
            'position' : position,
            "phone" : phone,
            'celphone' : celphone,
            'email' : email, 
            "alternativeEmail" : alternativeEmail,
            'notes' : notes
        });
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'authorization' : token,
        });
        return this._Http.post(route, params, {headers : headers}).map(res => res.json()); 
    }

    
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
        console.log("Ending the email");
        var route = 'https://jodevelopers-email-api.herokuapp.com/api/sendSingleEmail';
        var params = JSON.stringify({
            'dataClientTo' : 'info@hhr.co.cr',
            'dataClientFrom' : 'no-reply@hhr.com',
            'dataClientSubject' : "Mensaje de la web - HHR", 
            'dataReceivedName' : name,
            'dataReceivedPhone': phone,
            'dataReceivedEmail': email,
            'dataReceivedMessage' : message
        });
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this._Http.post(route, params, {headers : headers}).map(res => res.json()); 
    }// --> ./fnSendEmail
    

}// --> ./AppService
