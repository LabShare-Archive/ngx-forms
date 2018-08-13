import { Component } from "@angular/core"
import {Field} from "../../models/field.interface";
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import * as _ from 'lodash';



@Component({
    selector: 'form-radio',
    template: require('./form-radio.component.html')
})

export class FormRadioComponent implements  Field{
    field: FieldConfig;
    group: FormGroup;

  isShow () {
    return !this.field.hidden;
  }
}
