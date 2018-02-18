import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { TestResult } from '../../models/testresult.model';
import { TestHistoryComponent } from '../testhistory/testhistory.component';

@Component({
  selector: 'test-view',
  templateUrl: './testview.component.html',
  styleUrls: ['./testview.component.css']
})
export class TestViewComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    var json = this.testResult.log;
    var blob = new Blob([json], {type: "octet/stream"});
    this.url = window.URL.createObjectURL(blob);
    this.filename = this.testResult.buildResultKey + '_' + this.testResult.testId + '.log';
  }

  url: string;
  filename: string;

  @Input() testResult;

  close() {
    this.activeModal.close();
  }

  clickHistory() {
    this.activeModal.close();
    let options: NgbModalOptions = {
      size: 'lg'
    };
    let modalRef = this.modalService.open(TestHistoryComponent, options);
    modalRef.componentInstance.testResult = this.testResult;
  }
}
