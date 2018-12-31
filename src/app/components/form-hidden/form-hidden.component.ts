import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-hidden',
    template: require('./form-hidden.component.html')
})
export class FormInputHiddenComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
}
