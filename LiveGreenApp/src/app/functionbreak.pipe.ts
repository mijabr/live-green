import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'functionBreak'
})
export class FunctionBreakPipe implements PipeTransform {
  constructor() {}

  transform(functionString: string) {
    return functionString.replace("(", " (").replace(/,/g, ", ");
  }
}
