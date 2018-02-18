import { Component, OnInit, ViewChild } from '@angular/core';

import { EmployeeService }         from '../services/EmployeeService';
import { AttacheDatatableComponent, AttacheDataTable } from 'framework2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDetailComponent }   from './Employee.Detail';

@Component({
    selector: 'main-content',
    templateUrl: '/SubPages/Employees/Listing.html',
    providers: [EmployeeService]
})

export class EmployeesListingComponent implements OnInit  {
    
    SearchResults: Array<any>;
    headingsEmployees: Array<any>;
    dataEmployees: AttacheDataTable;
    SearchCriteria: Object;
    
    constructor(
        private employeeService: EmployeeService, private modalService: NgbModal) {
    }

    showEmployeeDetailModal(empId:any){
        const modalRef = this.modalService.open(EmployeeDetailComponent, {windowClass:'grey-top-bottom-modal'});
        modalRef.componentInstance.passData = empId;
    }
    
    doSearch(searchCriteria:any) {
        this.employeeService.getEmployeeList().subscribe(
            (response => this.dataEmployees = this.convertToDataTable(response)),
            function (error) {
                //console.log("Error happened" + error);
            },
            function () {
                //console.log("aaa");
            }
        );
    }

    setupHeadings() {
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
    }

    contentsChanged(data:any) {
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
    }

    ngOnInit() {
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
    }

    dataTableLoaded() {
        this.doSearch(this.SearchCriteria);
    }

    dataTableRowClicked(rowData: any) {
        this.showEmployeeDetailModal(rowData.EmployeeId);
    }
    
    dataTableElementClicked(elementData: any) {
        this.showEmployeeDetailModal(elementData.EmployeeId);
    }

    convertToDataTable(inputArray:any) {
        let resultArray: Array<Object> =[];

        var clickable = true;

        if (inputArray.Results.length > 0) {
            for (let existingAccount of inputArray.Results) {
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
                        rowData:
                        [
                            {
                                name: '<a test="test" (click)="showEmployeeDetailModal(\''+existingAccount.EmployeeId+'\');">' + existingAccount.FirstName + ' ' + existingAccount.LastName + '</a>'
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
                        rowData:
                        [
                            {
                                name: '<a href="#" test="test" datatableclick=\''+clickString+'\' >' + existingAccount.FirstName + ' ' + existingAccount.LastName + '</a>'
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
    }
}
