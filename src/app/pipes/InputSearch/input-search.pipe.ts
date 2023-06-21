import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputSearch',
})
export class InputSearchPipe implements PipeTransform {
  transform(movies:any[],value:string):any[] {
    let reg= new RegExp(value,'i')
    return value != "" ? movies.filter((e:any)=> e.title?.match(reg) || e.name?.match(reg)) : movies;
    
  }

}
