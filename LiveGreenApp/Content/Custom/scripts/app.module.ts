
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';

import { TopMenuComponent }   from './components/TopMenu';
import { FooterComponent }   from './components/Footer';
import { AppRoutingModule }   from './app.routing.module';


import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Helpers, ApiService,Spinner, AttacheDatatableComponent,AttacheFormValidation,EmailValidator, RequiredValidator, RegExpValidator, ExclusiveListValidator, AtLeastOneGroupValidator, FileSizeValidator, FileTypeValidator, FileRequiredValidator, CheckboxRequiredValidator, AttacheDatePicker } from 'framework2';

import { HomeComponent } from './components/Home';
import { EmployeesComponent } from './components/Employees';

import { EmployeeAddComponent }   from './components/Employee.Add';
import { EmployeesListingComponent }   from './components/Employees.Listing';
import { EmployeeDetailComponent }   from './components/Employee.Detail';


@NgModule({
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpModule, NgbModule.forRoot()],
    declarations: [AppComponent, Spinner, AttacheDatatableComponent,TopMenuComponent, FooterComponent, HomeComponent, EmployeesComponent,EmployeeAddComponent,EmployeesListingComponent,EmployeeDetailComponent, EmailValidator,RequiredValidator, RegExpValidator,ExclusiveListValidator, AtLeastOneGroupValidator, FileSizeValidator, FileTypeValidator, FileRequiredValidator, CheckboxRequiredValidator, AttacheDatePicker],
    entryComponents: [EmployeeDetailComponent],
    bootstrap: [AppComponent],
    providers: [Helpers, ApiService,AttacheFormValidation]
})

export class AppModule { }