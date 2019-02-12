import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { FieldConfig } from '../../types';

@Component({
    selector: 'form-hidden',
    template: require('./form-hidden.component.html')
})
export class FormInputHiddenComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}
