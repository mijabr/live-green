import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EnvironmentService } from './environment.service';
import { SafeUrlPipe } from './safeurl.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TimeSpanPipe } from './timespan.pipe';
import { FunctionBreakPipe } from './functionbreak.pipe';

import {
    // tslint:disable-next-line:max-line-length
    Helpers, ApiService, AuthHttp, Spinner, MultiSelectDropdownComponent, AttacheDatatableComponent, AttacheFormValidation, EmailValidator, RequiredValidator, OptionalRequiredValidator, RegExpValidator, ExclusiveListValidator, AtLeastOneGroupValidator, FileSizeValidator, FileTypeValidator, FileRequiredValidator, CheckboxRequiredValidator, AttacheDatePicker, TypeTrigger, WindowScrolling, AreaScrolling, EmailFormatPipe, PhoneFormatPipe, MobileFormatPipe,
    TypeMaskRegExp, TypeNumberFormatDecimalPlaces, TypeCurrencyFormat, AutofocusDirective, ConfirmPasswordValidator
} from 'framework2';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule],
    declarations: [
        // tslint:disable-next-line:max-line-length
        Spinner, MultiSelectDropdownComponent, AttacheDatatableComponent, 
        EmailValidator, RequiredValidator, OptionalRequiredValidator, 
        RegExpValidator, ExclusiveListValidator, AtLeastOneGroupValidator, 
        FileSizeValidator, FileTypeValidator, FileRequiredValidator, 
        CheckboxRequiredValidator, AttacheDatePicker, TypeTrigger, 
        WindowScrolling, AreaScrolling, EmailFormatPipe, PhoneFormatPipe, 
        MobileFormatPipe, TypeMaskRegExp, TypeNumberFormatDecimalPlaces, 
        TypeCurrencyFormat, AutofocusDirective, ConfirmPasswordValidator,
        SafeUrlPipe, TimeAgoPipe, TimeSpanPipe, FunctionBreakPipe
    ],

    exports: [
        // tslint:disable-next-line:max-line-length
        Spinner, MultiSelectDropdownComponent, AttacheDatatableComponent, 
        EmailValidator, RequiredValidator, OptionalRequiredValidator, 
        RegExpValidator, ExclusiveListValidator, AtLeastOneGroupValidator, 
        FileSizeValidator, FileTypeValidator, FileRequiredValidator, 
        CheckboxRequiredValidator, AttacheDatePicker, TypeTrigger, 
        WindowScrolling, AreaScrolling, EmailFormatPipe, PhoneFormatPipe, 
        MobileFormatPipe, TypeMaskRegExp, TypeNumberFormatDecimalPlaces, 
        TypeCurrencyFormat, FormsModule, AutofocusDirective, ConfirmPasswordValidator,
        SafeUrlPipe, TimeAgoPipe, TimeSpanPipe, FunctionBreakPipe
    ],
    providers: [
        Helpers, ApiService, AttacheFormValidation, EnvironmentService, TimeSpanPipe, FunctionBreakPipe
    ]
})
export  class SharedModule {

}
