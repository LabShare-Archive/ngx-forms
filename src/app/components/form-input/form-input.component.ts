import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html'
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
