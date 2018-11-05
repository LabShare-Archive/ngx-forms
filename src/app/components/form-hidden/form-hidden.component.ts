import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-hidden',
    templateUrl: './form-hidden.component.html'
})
export class FormInputHidden implements Field {
    field: IFieldConfig;
    group: FormGroup;
    model: object;
}
