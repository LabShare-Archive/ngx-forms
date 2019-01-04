import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { IFieldConfig } from '../../types';

@Component({
    selector: 'form-hidden',
    template: require('./form-hidden.component.html')
})
export class FormInputHiddenComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
}
