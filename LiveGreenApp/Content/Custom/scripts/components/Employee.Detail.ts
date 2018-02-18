import { OnInit, Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

 
@Component({
  selector: 'employee-detail-modal',
  templateUrl: '/SubPages/Employees/Detail.Modal.html'
})
export class EmployeeDetailComponent implements OnInit {
    @Input() passData:any;

    private employeeId: string;

    constructor(public employeeDetailModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.employeeId = this.passData;
    }
    
}