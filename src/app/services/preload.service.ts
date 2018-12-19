import { Injectable, Type } from '@angular/core';

import { FormInputComponent } from '../components/form-input/form-input.component';
import { FormSelectComponent } from '../components/form-select/form-select.component';
import { FormTextEditorComponent } from '../components/form-text-editor/form-text-editor.component';
import { FormCheckboxComponent } from '../components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../components/form-radio/form-radio.component';
import { FormTextareaComponent } from '../components/form-textarea/form-textarea.component';
import { FormInputHiddenComponent } from '../components/form-hidden/form-hidden.component';
import { FormUserComponent } from '../components/form-user/form-user.component';
import { FormLabelComponent } from '../components/form-label/form-label.component';

import { DynamicFieldService } from './dynamic-field.service';

@Injectable()
export class PreloadService {

    constructor(private dynamicFieldService: DynamicFieldService) {
        this.dynamicFieldService.addField('text', FormInputComponent);
        this.dynamicFieldService.addField('select', FormSelectComponent);
        this.dynamicFieldService.addField('editor', FormTextEditorComponent);
        this.dynamicFieldService.addField('textarea', FormTextareaComponent);
        this.dynamicFieldService.addField('hidden', FormInputHiddenComponent);
        this.dynamicFieldService.addField('user', FormUserComponent);
        this.dynamicFieldService.addField('radio', FormRadioComponent);
        this.dynamicFieldService.addField('checkbox', FormCheckboxComponent);
        this.dynamicFieldService.addField('label', FormLabelComponent);
    }
}

export const Components = [FormInputComponent, FormSelectComponent, FormTextEditorComponent, FormTextareaComponent, FormInputHiddenComponent, FormUserComponent, FormRadioComponent, FormCheckboxComponent, FormLabelComponent];
