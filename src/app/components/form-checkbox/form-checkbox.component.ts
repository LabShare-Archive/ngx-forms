import { Component } from "@angular/core"
import { Field } from "../../models/field.interface";
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'form-checkbox',
    templateUrl: './form-checkbox.component.html'
})

export class FormCheckboxComponent implements Field{
    field : FieldConfig;
    group: FormGroup;
    fields: FieldConfig[];


    isShow () {
      return !this.field.hidden;
    }
}
