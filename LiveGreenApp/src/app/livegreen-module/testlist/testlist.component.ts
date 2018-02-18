import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToastModule, ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EnvironmentService } from '../../environment.service';
import { LocalStorageService } from 'ng2-webstorage';
import { Router } from '@angular/router';
import { AttacheFormValidation } from 'framework2';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Helpers, AttacheDataTable, AttacheDataTableBase, AttacheDatatableComponent } from 'framework2';

import { TestListService } from './testlist.service';
import { TestResult } from '../../models/testresult.model';
import { TestFeature } from '../../models/testfeature.model';

import { TestViewComponent } from '../testview/testview.component';
import { TimeSpanPipe } from '../../timespan.pipe';
import { FunctionBreakPipe } from '../../functionbreak.pipe';

@Component({
  selector: 'test-list',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.css']
})
export class TestListComponent implements OnInit {

  constructor(
      private testService: TestListService,
      private toastr: ToastsManager,
      private environmentService: EnvironmentService,
      private localStorage: LocalStorageService,
      private modalService: NgbModal,
      private timeSpanPipe: TimeSpanPipe,
      private functionBreakPipe: FunctionBreakPipe
  ) { }


  private headings: Array<any>;
  private dataTable: AttacheDataTable;
  private items: Array<any> = [];
  private itemsOriginal: Array<any>;
  private sortBy: any;
  private isAesc: any;
  private isLoading = false;

  private features: TestFeature[];
  private selectedFeature: TestFeature;

  ngOnInit() {
    this.testService.getFeatureList().subscribe(
      features => {
        this.features = features
      },
      error => {
        console.log("Get test results failed. Error - ");
        console.log(error);
      }
    );

    this.setupHeadings();
    this.isAesc = false;
    this.sortBy = 'date';
  }

  featureClick(feature: TestFeature) {
    this.selectedFeature = feature;
    this.loadTestResults(feature);
  }

  dataTableElementClicked(event: any) {
    let options: NgbModalOptions = {
      size: 'lg'
    };
    let modalRef = this.modalService.open(TestViewComponent, options);
    modalRef.componentInstance.testResult = event;
  }

  setupHeadings() {
    this.headings = [
    {
      name: 'Result',
      width: '5%',
      sortBy: 'success'
    },
    {
      name: 'Scenario',
      width: '25%',
    },
    {
      name: 'Duration',
      width: '5%',
    },
    {
      name: 'Name',
      width: '65%',
      isAesc: false
    },
    ];
  }

  loadTestResults(feature: TestFeature) {
    this.isLoading = true;
    this.testService.getTestListForBuildKey(feature.buildResultKey).subscribe(
      testsResults => {
        this.dataProcess(testsResults);
        this.contentsChanged({ isAesc: this.isAesc, page: 1, perPage: 20, sortBy: this.sortBy });
      },
      error => {
        console.log("Get test results failed. Error - ");
        console.log(error);
      }
      );
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
                width: '5%'
              },
              {
                name: '<span class="testlist-result-row">' + item.scenario + '</span>',
                contentClickData: item,
                width: '25%'
              },
              {
                name: '<span class="testlist-result-row">' + this.timeSpanPipe.transform(item.duration) + '</span>',
                contentClickData: item,
                width: '5%'
              },
              {
                name: '<span class="testlist-result-row testlist-result-row-name">' + this.functionBreakPipe.transform(item.name) + '</span>',
                contentClickData: item,
                width: '65%'
              }
            ]
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

  getPassingString(feature: TestFeature) {
    if (feature.testPassCount == feature.testCount)
    {
        return feature.testCount + " tests passing";
    }

    return feature.testPassCount + "/" + feature.testCount + " tests passing";
  }
}
