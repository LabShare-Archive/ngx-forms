import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { IFieldConfig } from '../../models/field-config.interface';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
    selector: 'form-text-editor',
    template: require('./form-text-editor.component.html'),
    styles: [require('./form-text-editor.component.scss').toString()],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FormTextEditorComponent),
        multi: true,
      },
    ],
})
export class FormTextEditorComponent implements Field {
    field: IFieldConfig;
    group: FormGroup;
    model: object;

    private quillToolbar: object = {
        toolbar: ['bold', 'italic', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, { 'list': 'ordered' }, { 'list': 'bullet' }, 'blockquote', 'code-block', 'link']
    };

}
