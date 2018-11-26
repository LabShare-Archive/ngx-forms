import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormNavComponent } from './form-nav.component';
import { NavDirective } from './form-nav.directive';
import { FormNavService } from './form-nav.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FormNavComponent,
        NavDirective
    ],
    exports: [
        FormNavComponent,
        NavDirective
    ],
    providers: [
        FormNavService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormNavModule { }
