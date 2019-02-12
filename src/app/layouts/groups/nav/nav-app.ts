import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormNavComponent } from './components/form-nav.component';
import { NavDirective } from './directives/form-nav.directive';
import { FormNavService } from './services/form-nav.service';
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
