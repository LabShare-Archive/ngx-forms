import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-hidden',
    template: require('./form-hidden.component.html')
})
export class FormInputHiddenComponent extends BaseFieldComponent { }