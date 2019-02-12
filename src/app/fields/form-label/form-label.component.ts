import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldConfig } from '../../../types';

@Component({
    selector: 'form-label',
    template: require('./form-label.component.html')
})
export class FormLabelComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}
