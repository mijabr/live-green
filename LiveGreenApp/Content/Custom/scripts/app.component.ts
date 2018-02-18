import { Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'AppAdmin',
    templateUrl: '/SubPages/Template.html'
})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;

    public constructor(viewContainerRef:ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
 }