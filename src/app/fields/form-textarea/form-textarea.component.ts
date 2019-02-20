import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-textarea',
    template: require('./form-textarea.component.html')
})
export class FormTextareaComponent extends BaseFieldComponent { }
