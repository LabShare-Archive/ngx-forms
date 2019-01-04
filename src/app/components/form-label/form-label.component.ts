import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { IFieldConfig } from '../../types';

@Component({
    selector: 'form-label',
    template: require('./form-label.component.html')
})
export class FormLabelComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
}
