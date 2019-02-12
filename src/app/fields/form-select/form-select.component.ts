import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { FieldConfig } from '../../types';

@Component({
    selector: 'form-select',
    template: require('./form-select.component.html')
})
export class FormSelectComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}
