import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { IFieldConfig } from '../../types';

@Component({
    selector: 'form-input',
    template: require('./form-input.component.html')
})
export class FormInputComponent implements Field  {
    field: IFieldConfig;
    group: FormGroup;
}
