import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../types';
import { FieldConfig } from '../../types';

@Component({
    selector: 'form-textarea',
    template: require('./form-textarea.component.html')
})
export class FormTextareaComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}
