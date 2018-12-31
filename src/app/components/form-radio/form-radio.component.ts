import { Component } from '@angular/core';
import {Field} from '../../models/field.interface';
import { FormGroup } from '@angular/forms';
import { IFieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-radio',
    template: require('./form-radio.component.html')
})

export class FormRadioComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
}
