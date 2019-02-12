import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldConfig } from '../../../types';

@Component({
    selector: 'form-radio',
    template: require('./form-radio.component.html')
})

export class FormRadioComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}
