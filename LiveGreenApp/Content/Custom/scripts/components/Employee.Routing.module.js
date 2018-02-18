"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Employees_1 = require('./Employees');
var Employee_Add_1 = require('./Employee.Add');
var Employees_Listing_1 = require('./Employees.Listing');
var employeeRoutes = [
    {
        path: '',
        component: Employees_1.EmployeesComponent,
        children: [
            {
                path: '',
                component: Employees_1.EmployeesComponent
            },
            {
                path: 'Add',
                component: Employee_Add_1.EmployeeAddComponent
            },
            {
                path: 'Listing',
                component: Employees_Listing_1.EmployeesListingComponent
            }
        ]
    }
];
var EmployeeRoutingModule = (function () {
    function EmployeeRoutingModule() {
    }
    EmployeeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(employeeRoutes)
            ],
            declarations: [
                Employees_1.EmployeesComponent,
                Employee_Add_1.EmployeeAddComponent,
                Employees_Listing_1.EmployeesListingComponent
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeRoutingModule);
    return EmployeeRoutingModule;
}());
exports.EmployeeRoutingModule = EmployeeRoutingModule;
//# sourceMappingURL=Employee.Routing.module.js.map