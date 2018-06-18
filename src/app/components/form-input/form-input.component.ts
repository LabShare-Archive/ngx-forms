import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  template: require('./form-input.component.html')
})
export class FormInputComponent implements Field {
  field: FieldConfig;
  group: FormGroup;
  fields: FieldConfig[];

  isShow () {
    return !this.field.hidden;
  }
}
