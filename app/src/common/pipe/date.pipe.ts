import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "date"
})

export class DatePipe implements PipeTransform {
  transform(value: any, type: string): any {
    let date = new Date(value);
    let returnTxt = type;

    let types = [
      {
        reg: /yyyy/g,
        value: this.addTop(date.getFullYear()),
      },
      {
        reg: /MM/g,
        value: this.addTop(date.getMonth() + 1),
      },
      {
        reg: /dd/g,
        value: this.addTop(date.getDay()),
      },
      {
        reg: /HH/g,
        value: this.addTop(date.getHours()),
      },
      {
        reg: /mm/g,
        value: this.addTop(date.getMinutes()),
      },
      {
        reg: /ss/g,
        value: this.addTop(date.getSeconds()),
      },
    ]

    types.forEach(e => {
      returnTxt = returnTxt.replace(e.reg, e.value);
    })

    return returnTxt;
  }

  private addTop(num: number) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  }
}
