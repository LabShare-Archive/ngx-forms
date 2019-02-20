import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-checkbox',
    template: require('./form-checkbox.component.html')
})
export class FormCheckboxComponent extends BaseFieldComponent {}
