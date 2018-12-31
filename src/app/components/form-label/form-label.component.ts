import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-label',
    template: require('./form-label.component.html')
})
export class FormLabelComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
}
