import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DynamicFieldDirective
    ],
    exports: [
        DynamicFieldDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DynamicFieldModule { }
