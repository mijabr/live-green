import { OnInit, Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { EmployeeDetailComponent }   from './Employee.Detail';
import { AttacheFormValidation } from 'framework2';

@Component({
    selector: 'main-content',
    templateUrl: '/SubPages/Employees/Add.html'
})

export class EmployeeAddComponent  {
    private fileUploaded: File;
    private fileContent: string;
    public user: Object;

    constructor(private validator: AttacheFormValidation) {
        this.user = {
            FirstName: '',
            LastName: '',
            WorkEmail: '',
            FileUpload: "",
            Gender: '',
            State:'',
            Fruits:[
                {
                    name:"Apple",
                    value:'Apple', 
                    checked:false
                },
                {
                    name:"Orange",
                    value:'Orange', 
                    checked:false
                },
                {
                    name:"Watermelon",
                    value:'Watermelon', 
                    checked:false
                }
            ],
            StartDate:'',
            EndDate:''
        }
     }

    
    ChangeFile(evt:any){
        this.fileUploaded = evt.target.files[0];
        var reader = new FileReader();
        reader.onloadend = (e) => {
             this.fileContent = reader.result;
        }

        reader.readAsDataURL(this.fileUploaded);
    }

    OpenPicker(picker:any){
        picker.open();
    }
    ClosePicker(picker:any){
        setTimeout(function() {
            picker.close();
        }, 100);
    }

    submitAddEmployeeForm(formData: any) {
        // call API to save customer
        //console.log(formData, isValid);
        formData.FileUpload = this.fileContent;
        console.log(formData);
        
    }
}
