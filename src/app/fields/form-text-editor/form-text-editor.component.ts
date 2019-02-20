import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-text-editor',
    template: require('./form-text-editor.component.html'),
    styles: [require('./form-text-editor.component.scss').toString()],
})
export class FormTextEditorComponent extends BaseFieldComponent {

    public quillToolbar: object = {
        toolbar: ['bold', 'italic', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, { 'list': 'ordered' }, { 'list': 'bullet' }, 'blockquote', 'code-block', 'link']
    };

}
