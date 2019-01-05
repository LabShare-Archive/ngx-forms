import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavDirective } from './directives/form-nav.directive';
import { FormNavService } from './services/form-nav.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NavDirective
    ],
    exports: [
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
