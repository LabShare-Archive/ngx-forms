import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { IFieldConfig } from '../../types';

@Component({
    selector: 'form-select',
    template: require('./form-select.component.html')
})
export class FormSelectComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
}
