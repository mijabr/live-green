import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './Employees';
import { EmployeeAddComponent }   from './Employee.Add';
import { EmployeesListingComponent }   from './Employees.Listing';

const employeeRoutes: Routes = [
  {
        path: '',
        component: EmployeesComponent,
        children:[
            {
                path: '', 
                component: EmployeesComponent
            },
            {
                path: 'Add', 
                component: EmployeeAddComponent
            },
            {   
                path: 'Listing', 
                component: EmployeesListingComponent
            }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(employeeRoutes)
  ],
  
  declarations: [
    EmployeesComponent,
    EmployeeAddComponent,
    EmployeesListingComponent
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule {}