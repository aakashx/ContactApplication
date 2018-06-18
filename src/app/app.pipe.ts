import { Pipe,PipeTransform } from "@angular/core";
import {Info} from './app.interface';
@Pipe({
    name: 'orderBy'
})
export class OrderPipe implements PipeTransform{
    transform(contacts : Info[]){
        let  byName = contacts || []; 
        byName.sort(function(a,b) {
        let x = a.name.toUpperCase();
        let y = b.name.toUpperCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    return byName;        
    }
}