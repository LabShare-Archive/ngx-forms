import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-select',
    template: require('./form-select.component.html')
})
export class FormSelectComponent extends BaseFieldComponent {}

