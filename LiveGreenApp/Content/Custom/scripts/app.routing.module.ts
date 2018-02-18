import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/Home';
import { EmployeesComponent } from './components/Employees';
import { EmployeeAddComponent }   from './components/Employee.Add';
import { EmployeesListingComponent }   from './components/Employees.Listing';

const routes: Routes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    {
        path: 'Home',
        component: HomeComponent
    },
    {
        path: 'Employees',
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
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}