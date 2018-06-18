import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
	selector: 'form-text-editor',
	templateUrl: 'form-text-editor.component.html',
    styles: [require('./form-text-editor.component.scss').toString()]
})
export class FormTextEditorComponent implements Field {
  field: FieldConfig;
	group: FormGroup;
  fields: FieldConfig[];
  private quillToolbar: object = {
		toolbar: ['bold', 'italic', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, { 'list': 'ordered' }, { 'list': 'bullet' }, 'blockquote', 'code-block', 'link']
	};

  isShow () {
    return !this.field.hidden;
  }
}
