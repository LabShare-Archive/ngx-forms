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
    fields: FieldConfig[];

  /**
   * {
   *    radioName1: refName1,
   *    radioName2: refName2
   * }
    * @type {{}}
   */
  private radioMap = {};


  isShow () {
    return !this.field.hidden;
  }

  /**
   * @description change the ref component disabled status when radio button changes
   * @param refName
   */
  onSelectionChange(refName) {
    let radioName = this.field.name;
    let isDisabled = false;
    if (!refName) {
        refName = this.radioMap[radioName];
        isDisabled = true;
    }

    this.fields.forEach(field => {
      if (field.name === refName) {
        field.hidden = isDisabled;
        this.radioMap[radioName] = refName;
      }
    });

  }
}
