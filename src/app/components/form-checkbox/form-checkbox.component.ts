import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { FieldConfig } from '../../types';

@Component({
    selector: 'form-checkbox',
    template: require('./form-checkbox.component.html')
})
export class FormCheckboxComponent implements Field  {
    field: FieldConfig;
    group: FormGroup;
}
