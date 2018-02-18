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
var EmployeeService_1 = require('../services/EmployeeService');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var Employee_Detail_1 = require('./Employee.Detail');
var EmployeesListingComponent = (function () {
    function EmployeesListingComponent(employeeService, modalService) {
        this.employeeService = employeeService;
        this.modalService = modalService;
    }
    EmployeesListingComponent.prototype.showEmployeeDetailModal = function (empId) {
        var modalRef = this.modalService.open(Employee_Detail_1.EmployeeDetailComponent, { windowClass: 'grey-top-bottom-modal' });
        modalRef.componentInstance.passData = empId;
    };
    EmployeesListingComponent.prototype.doSearch = function (searchCriteria) {
        var _this = this;
        this.employeeService.getEmployeeList().subscribe((function (response) { return _this.dataEmployees = _this.convertToDataTable(response); }), function (error) {
            //console.log("Error happened" + error);
        }, function () {
            //console.log("aaa");
        });
    };
    EmployeesListingComponent.prototype.setupHeadings = function () {
        this.headingsEmployees = [
            {
                name: "Name / Login Email"
            },
            {
                name: "Account Status"
            },
            {
                name: "Registered on"
            },
            {
                name: "Last Login"
            },
            {
                name: "App status"
            }
        ];
    };
    EmployeesListingComponent.prototype.contentsChanged = function (data) {
        this.SearchCriteria = {
            Name: "",
            PageNumber: data.page,
            PageSize: data.perPage,
            SecurityUserId: "",
            SortBy: "AlternateSequence",
            SortDirection: "DESC",
            Status: ""
        };
        this.doSearch(this.SearchCriteria);
    };
    EmployeesListingComponent.prototype.ngOnInit = function () {
        this.setupHeadings();
        this.SearchCriteria = {
            Name: "",
            PageNumber: 1,
            PageSize: 20,
            SecurityUserId: "",
            SortBy: "AlternateSequence",
            SortDirection: "DESC",
            Status: ""
        };
    };
    EmployeesListingComponent.prototype.dataTableLoaded = function () {
        this.doSearch(this.SearchCriteria);
    };
    EmployeesListingComponent.prototype.dataTableRowClicked = function (rowData) {
        this.showEmployeeDetailModal(rowData.EmployeeId);
    };
    EmployeesListingComponent.prototype.dataTableElementClicked = function (elementData) {
        this.showEmployeeDetailModal(elementData.EmployeeId);
    };
    EmployeesListingComponent.prototype.convertToDataTable = function (inputArray) {
        var resultArray = [];
        var clickable = true;
        if (inputArray.Results.length > 0) {
            for (var _i = 0, _a = inputArray.Results; _i < _a.length; _i++) {
                var existingAccount = _a[_i];
                var AccountActive = 'Inactive';
                var AccountStatusStyle = 'checkmark grey-75-font';
                if (existingAccount.IsActive) {
                    AccountActive = 'Active';
                    AccountStatusStyle = 'checkmark green-dark-font';
                }
                var HasBusinessApp = existingAccount.HasBusinessApp ? "on" : "off";
                var HasPersonalApp = existingAccount.HasPersonalApp ? "on" : "off";
                var HasAdminApp = existingAccount.HasAdminPortal ? "on" : "off";
                var RegisteredOn = new Date(existingAccount.RegisteredOn);
                var LastLoginOn = new Date(existingAccount.LastLoginOn);
                var RegisteredOnString = " - ";
                var LastLoginOnString = " - ";
                if (clickable) {
                    resultArray.push({
                        rowClickData: existingAccount,
                        rowData: [
                            {
                                name: '<a test="test" (click)="showEmployeeDetailModal(\'' + existingAccount.EmployeeId + '\');">' + existingAccount.FirstName + ' ' + existingAccount.LastName + '</a>'
                            },
                            {
                                name: '<span class="icon icon-' + AccountStatusStyle + ' vertical-align-middle font-size-24"></span> ' + AccountActive
                            },
                            {
                                name: RegisteredOnString
                            },
                            {
                                name: LastLoginOnString
                            },
                            {
                                name: '<span title="Personal" class="round-circle-letter has-personal-app ' + HasPersonalApp + '">P</span>&nbsp;<span title="Business" class="round-circle-letter has-business-app ' + HasBusinessApp + '">B</span>&nbsp;<span title="Admin" class="round-circle-letter has-admin-app ' + HasAdminApp + '">A</span>'
                            }
                        ]
                    });
                }
                else {
                    var clickString = JSON.stringify({ EmployeeId: existingAccount.EmployeeId, FirstName: existingAccount.FirstName });
                    resultArray.push({
                        rowData: [
                            {
                                name: '<a href="#" test="test" datatableclick=\'' + clickString + '\' >' + existingAccount.FirstName + ' ' + existingAccount.LastName + '</a>'
                            },
                            {
                                name: '<span class="icon icon-' + AccountStatusStyle + ' vertical-align-middle font-size-24"></span> ' + AccountActive
                            },
                            {
                                name: "<span onclick='alert(\"asdf\");'>test</span>"
                            },
                            {
                                name: LastLoginOnString
                            },
                            {
                                name: '<span title="Personal" class="round-circle-letter has-personal-app ' + HasPersonalApp + '">P</span>&nbsp;<span title="Business" class="round-circle-letter has-business-app ' + HasBusinessApp + '">B</span>&nbsp;<span title="Admin" class="round-circle-letter has-admin-app ' + HasAdminApp + '">A</span>'
                            }
                        ]
                    });
                }
                clickable = !clickable;
            }
        }
        var pagination = {
            PageNumber: inputArray.Request.PageNumber,
            PageSize: inputArray.Request.PageSize,
            Total: inputArray.Total
        };
        return { tableData: resultArray, pagination: pagination };
    };
    EmployeesListingComponent = __decorate([
        core_1.Component({
            selector: 'main-content',
            templateUrl: '/SubPages/Employees/Listing.html',
            providers: [EmployeeService_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [EmployeeService_1.EmployeeService, ng_bootstrap_1.NgbModal])
    ], EmployeesListingComponent);
    return EmployeesListingComponent;
}());
exports.EmployeesListingComponent = EmployeesListingComponent;
//# sourceMappingURL=Employees.Listing.js.map