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
var framework2_1 = require('framework2');
var EmployeeAddComponent = (function () {
    function EmployeeAddComponent(validator) {
        this.validator = validator;
        this.user = {
            FirstName: '',
            LastName: '',
            WorkEmail: '',
            FileUpload: "",
            Gender: '',
            State: '',
            Fruits: [
                {
                    name: "Apple",
                    value: 'Apple',
                    checked: false
                },
                {
                    name: "Orange",
                    value: 'Orange',
                    checked: false
                },
                {
                    name: "Watermelon",
                    value: 'Watermelon',
                    checked: false
                }
            ],
            StartDate: '',
            EndDate: ''
        };
    }
    EmployeeAddComponent.prototype.ChangeFile = function (evt) {
        var _this = this;
        this.fileUploaded = evt.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {
            _this.fileContent = reader.result;
        };
        reader.readAsDataURL(this.fileUploaded);
    };
    EmployeeAddComponent.prototype.OpenPicker = function (picker) {
        picker.open();
    };
    EmployeeAddComponent.prototype.ClosePicker = function (picker) {
        setTimeout(function () {
            picker.close();
        }, 100);
    };
    EmployeeAddComponent.prototype.submitAddEmployeeForm = function (formData) {
        // call API to save customer
        //console.log(formData, isValid);
        formData.FileUpload = this.fileContent;
        console.log(formData);
    };
    EmployeeAddComponent = __decorate([
        core_1.Component({
            selector: 'main-content',
            templateUrl: '/SubPages/Employees/Add.html'
        }), 
        __metadata('design:paramtypes', [framework2_1.AttacheFormValidation])
    ], EmployeeAddComponent);
    return EmployeeAddComponent;
}());
exports.EmployeeAddComponent = EmployeeAddComponent;
//# sourceMappingURL=Employee.Add.js.map