import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    if (!array || !array.length) {
      return [];
    }

    const filteredArray = array.filter((item) => item && item[field]);

    filteredArray.sort((a, b) => {
      const dateA = new Date(a[field]);
      const dateB = new Date(b[field]);

      return dateA.getTime() - dateB.getTime();
    });
    return filteredArray;
  }
}
