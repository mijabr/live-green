import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'timeSpan'
})
export class TimeSpanPipe implements PipeTransform {
  constructor() {}

  transform(secondsString: string) {
    let seconds = parseFloat(secondsString);
    console.log(secondsString + "-" + seconds);
    if (isNaN(seconds))
    {
      return "";
    }
  
    let date = new Date(1970,0,1);
    let isLarge = false;
    date.setSeconds(seconds);
    let timeSpan = "";
    if (date.getHours() > 0)
    {
      timeSpan += date.getHours() + "h ";
      isLarge = true;
    }
    if (date.getMinutes() > 0)
    {
      timeSpan += date.getMinutes() + "m ";
      isLarge = true;
    }
    let millis = seconds % 1;
    if (isLarge)
    {
      if (date.getSeconds())
      {
        timeSpan += date.getSeconds() + "s";
      }
    }
    else if (date.getSeconds() + millis > 0)
    {
      timeSpan += (date.getSeconds() + millis).toFixed(2) + "s";
    }

    return timeSpan;
  }
}
