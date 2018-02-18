import { NgModule }       from '@angular/core';
import { EmployeesComponent } from './Employees';
import { EmployeeAddComponent }   from './Employee.Add';
import { EmployeesListingComponent }   from './Employees.Listing';
import { EmployeeRoutingModule }       from './Employee.Routing.module';

@NgModule({
  imports: [
    EmployeeRoutingModule
  ],
  
  declarations: [
    EmployeesComponent,
    EmployeeAddComponent,
    EmployeesListingComponent
  ]
})
export class EmployeeModule {}