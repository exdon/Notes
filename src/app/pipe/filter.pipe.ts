import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: Array<any>, property: string, filterValue: any) {
    return array.filter((obj) => {
      return obj[property] == filterValue;
    });
  }

}
