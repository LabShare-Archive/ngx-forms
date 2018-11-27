import { Component } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-checkbox',
    template: require('./form-checkbox.component.html')
})

export class FormCheckboxComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
    model: object;
}
