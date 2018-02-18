import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from './livegreen-module/testlist/testlist.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/testlist', pathMatch: 'full'
    },
    {
        path: 'testlist',
        component: TestListComponent
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
