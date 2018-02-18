import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestListComponent } from './testlist/testlist.component';

const routesLiveGreen: Routes = [
    { path: 'testlist', component: TestListComponent }
];

export const LiveGreenRouting: ModuleWithProviders = RouterModule.forChild(routesLiveGreen);
