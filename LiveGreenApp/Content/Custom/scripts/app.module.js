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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var TopMenu_1 = require('./components/TopMenu');
var Footer_1 = require('./components/Footer');
var app_routing_module_1 = require('./app.routing.module');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var framework2_1 = require('framework2');
var Home_1 = require('./components/Home');
var Employees_1 = require('./components/Employees');
var Employee_Add_1 = require('./components/Employee.Add');
var Employees_Listing_1 = require('./components/Employees.Listing');
var Employee_Detail_1 = require('./components/Employee.Detail');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, forms_1.FormsModule, http_1.HttpModule, ng_bootstrap_1.NgbModule.forRoot()],
            declarations: [app_component_1.AppComponent, framework2_1.Spinner, framework2_1.AttacheDatatableComponent, TopMenu_1.TopMenuComponent, Footer_1.FooterComponent, Home_1.HomeComponent, Employees_1.EmployeesComponent, Employee_Add_1.EmployeeAddComponent, Employees_Listing_1.EmployeesListingComponent, Employee_Detail_1.EmployeeDetailComponent, framework2_1.EmailValidator, framework2_1.RequiredValidator, framework2_1.RegExpValidator, framework2_1.ExclusiveListValidator, framework2_1.AtLeastOneGroupValidator, framework2_1.FileSizeValidator, framework2_1.FileTypeValidator, framework2_1.FileRequiredValidator, framework2_1.CheckboxRequiredValidator, framework2_1.AttacheDatePicker],
            entryComponents: [Employee_Detail_1.EmployeeDetailComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [framework2_1.Helpers, framework2_1.ApiService, framework2_1.AttacheFormValidation]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map