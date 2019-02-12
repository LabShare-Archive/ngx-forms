import { Component} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Field } from '../../types';
import { FieldConfig } from '../../types';

@Component({
    selector: 'form-text-editor',
    template: require('./form-text-editor.component.html'),
    styles: [require('./form-text-editor.component.scss').toString()],
})
export class FormTextEditorComponent implements Field {
    field: FieldConfig;
    group: FormGroup;

    public quillToolbar: object = {
        toolbar: ['bold', 'italic', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, { 'list': 'ordered' }, { 'list': 'bullet' }, 'blockquote', 'code-block', 'link']
    };

}
