import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-input',
    template: require('./form-input.component.html')
})
export class FormInputComponent implements Field  {
    field: IFieldConfig;
    group: FormGroup;
}
