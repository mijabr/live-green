import { Component } from '@angular/core';

@Component({
    selector: 'date-field'
})

export class DateFieldComponent  {

    OpenPicker(picker:any){
        picker.open();
    }
    ClosePicker(picker:any){
        setTimeout(function() {
            picker.close();
        }, 100);
    }
}
