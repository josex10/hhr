import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure: false 
})
export class FilterPipe implements PipeTransform {
  transform(items: any[],searchType : string,  searchData: string): any[] {

    if(!searchType || !searchData){
        return items;
    }

    if(searchType == "name"){
        items =  items.filter(item => item.name.indexOf(searchData) !== -1);
    }

    if(searchType == "surname"){
        items =  items.filter(item => item.surname.indexOf(searchData) !== -1);
    }

    if(searchType == "company"){
        items =  items.filter(item => item.company.indexOf(searchData) !== -1);
    }

    if(searchType == "email"){
        items =  items.filter(item => item.email.indexOf(searchData) !== -1);
    }

    if(searchType == "phone"){
        items =  items.filter(item => item.phone.indexOf(searchData) !== -1);
    }

    return items;

    
   }
}