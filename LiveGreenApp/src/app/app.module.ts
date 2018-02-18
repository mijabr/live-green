import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LiveGreenModule } from './livegreen-module/livegreen.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { AppRoutingModule } from './app.routing.module';



export class CustomToastOptions extends ToastOptions {
    positionClass = 'toast-top-center';
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, LiveGreenModule, SharedModule, BrowserAnimationsModule,
    ToastModule.forRoot(), AppRoutingModule, NgbModule.forRoot()
  ],
  providers: [
    { provide: ToastOptions, useClass: CustomToastOptions }
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
