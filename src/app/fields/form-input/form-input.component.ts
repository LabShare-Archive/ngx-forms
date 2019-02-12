import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig, Field } from '../../../types';

@Component({
    selector: 'form-input',
    template: require('./form-input.component.html')
})
export class FormInputComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}
