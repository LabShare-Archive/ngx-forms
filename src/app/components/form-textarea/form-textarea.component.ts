import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-textarea',
    template: require('./form-textarea.component.html')
})
export class FormTextareaComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
}
