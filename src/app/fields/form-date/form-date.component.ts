import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerAdapter } from '../../adapters/date-picker.adapter';

@Component({
    selector: 'form-date',
    template: require('./form-date.component.html'),
    providers: [
        {
            provide: NgbDateAdapter,
            useClass: DatePickerAdapter
        }]
})
export class FormDateComponent extends BaseFieldComponent { }
