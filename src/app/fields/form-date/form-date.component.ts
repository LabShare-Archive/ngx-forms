import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldConfig } from '../../../types';

@Component({
    selector: 'form-date',
    template: require('./form-date.component.html')
})
export class FormDateComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}
