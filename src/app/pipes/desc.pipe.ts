import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'desc'
})
export class DescPipe implements PipeTransform {

  transform(desc:string):any {
    return desc.split(" ").slice(0,15).join(" ")
  }

}
