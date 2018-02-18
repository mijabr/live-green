import {NgModule, ModuleWithProviders} from "@angular/core";
import { Spinner, Helpers, ApiService,AttacheFormValidation } from 'framework2';


@NgModule({
  providers: [Helpers, ApiService,AttacheFormValidation],
  declarations:[Spinner]
})

export class SharedModule {}