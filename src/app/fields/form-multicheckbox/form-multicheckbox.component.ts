import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base-field';

@Component({
    selector: 'form-multicheckbox',
    template: require('./form-multicheckbox.component.html')
})

export class FormMultiCheckboxComponent extends BaseFieldComponent { }
