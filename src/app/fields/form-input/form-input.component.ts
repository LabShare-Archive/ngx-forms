import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-input',
    template: require('./form-input.component.html')
})
export class FormInputComponent extends BaseFieldComponent {
}
