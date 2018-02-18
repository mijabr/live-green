import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestListComponent } from './testlist/testlist.component';
import { TestViewComponent } from './testview/testview.component';
import { TestHistoryComponent } from './testhistory/testhistory.component';
import { TestListService } from './testlist/testlist.service';
import { SharedModule } from '../shared.module';
import { Ng2Webstorage } from 'ng2-webstorage';

@NgModule({
  imports: [
    CommonModule, SharedModule, Ng2Webstorage
  ],
  declarations: [TestListComponent, TestViewComponent, TestHistoryComponent],
  exports: [TestListComponent, TestViewComponent, TestHistoryComponent],
  providers: [TestListService, TestViewComponent, TestHistoryComponent],
  bootstrap: [TestListComponent, TestViewComponent, TestHistoryComponent],
  entryComponents: [TestViewComponent, TestHistoryComponent]
})
export class LiveGreenModule { }
