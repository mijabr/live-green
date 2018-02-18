import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Helpers, AttacheDataTable, AttacheDataTableBase, AttacheDatatableComponent } from 'framework2';

import { TestResult } from '../../models/testresult.model';
import { TestListService } from '../testlist/testlist.service';
import { TestViewComponent } from '../testview/testview.component';
import { TimeSpanPipe } from '../../timespan.pipe';

@Component({
  selector: 'test-history',
  templateUrl: './testhistory.component.html',
  styleUrls: ['./testhistory.component.css']
})
export class TestHistoryComponent implements OnInit {

  constructor(
    private testService: TestListService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private timeSpanPipe: TimeSpanPipe
  ) { }

  @Input() testResult;

  private headings: Array<any>;
  private dataTable: AttacheDataTable;
  private items: Array<any> = [];
  private itemsOriginal: Array<any>;
  private sortBy: any;
  private isAesc: any;
  private isLoading = false;

  private testResultHistory: TestResult[];
  private numerOfRuns: number;
  private averageDuration: number;
  private passRate: number;
  
  ngOnInit() {
    this.testService.getTestHistoryList(this.testResult.testId).subscribe(
      testsResults => {
        this.testResultHistory = testsResults;
        this.calculateStats();
        this.dataProcess(testsResults);
        this.contentsChanged({ isAesc: this.isAesc, page: 1, perPage: 20, sortBy: this.sortBy });
      },
      error => {
        console.log("Get test results history failed. Error - ");
        console.log(error);
      }
      );

      this.setupHeadings();
      this.isAesc = false;
      this.sortBy = 'date';
    }

  close() {
    this.activeModal.close();
  }

  back() {
    this.activeModal.close();
    let options: NgbModalOptions = {
      size: 'lg'
    };
    let modalRef = this.modalService.open(TestViewComponent, options);
    modalRef.componentInstance.testResult = this.testResult;
  }

  dataTableElementClicked(event: any) {
    this.activeModal.close();

    let options: NgbModalOptions = {
      size: 'lg'
    };
    let modalRef = this.modalService.open(TestViewComponent, options);
    modalRef.componentInstance.testResult = event;
  }

  calculateStats() {
    this.numerOfRuns = this.testResultHistory.length;

    var totalDuration: number = 0;
    this.testResultHistory.forEach(function(t) { totalDuration += parseFloat(t.duration); });
    this.averageDuration = totalDuration / this.numerOfRuns;

    var totalPasses: number = this.testResultHistory.filter(function(t) { return t.success; }).length
    this.passRate = totalPasses / this.numerOfRuns;
  }

  setupHeadings() {
    this.headings = [
    {
        name: 'Result',
        width: '10%',
        sortBy: 'success'
    },
    {
        name: 'Bamboo Run Key',
        width: '40%',
    },
    {
        name: 'Duration',
        width: '40%',
        isAesc: false
    }];
  }

  dataTableLoaded(event: any) {
  }  

  dataProcess(data: any) {
    this.items = data;
    this.itemsOriginal = data;
  }
  
  contentsChanged(data: any) {
    //this.items = this.sortingData(data.sortBy, data.isAesc, this.items);
    this.assignSorting(data.sortBy, data.isAesc);
    this.dataTable = this.convertToDataTable(this.items);
  }

  assignSorting(sortBy: any, isAesc: any) {
    this.sortBy = sortBy;
    this.isAesc = isAesc;
  }

  convertToDataTable(inputArray: Array<any>): AttacheDataTable {
      let dt: AttacheDataTable = new AttacheDataTable();
      dt.tableData = new Array<any>();

      if (inputArray.length > 0) {
          for (const item of inputArray) {
              dt.tableData.push({
                  rowData:
                  [
                      {
                          name: '<span class="testlist-result-row ' + (item.success ? 'testlist-result-success' : 'testlist-result-fail') + '">' + (item.success ? 'Pass' : 'Fail') + '</span>',
                          contentClickData: item,
                          width: '10%'
                      },
                      {
                          name: '<span class="testlist-result-row">' + item.buildResultKey + '</span>',
                          contentClickData: item,
                          width: '40%'
                      },
                      {
                          name: '<span class="testlist-result-row">' + this.timeSpanPipe.transform(item.duration) + '</span>',
                          contentClickData: item,
                          width: '60%'
                      }                  ]
              });
          }
      }
      dt.pagination = {
          PageNumber: 1,
          PageSize: 99999,
          Total: 99999
      };

      this.isLoading = false;
      return dt;
    }
  }
