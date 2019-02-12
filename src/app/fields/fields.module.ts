import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTextEditorComponent } from './form-text-editor/form-text-editor.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { FormInputHiddenComponent } from './form-hidden/form-hidden.component';
import { FormLabelComponent } from './form-label/form-label.component';
import { FormDateComponent } from './form-date/form-date.component';
import { FieldDictionary } from '../../types';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const defaultInputs: FieldDictionary = {
    text: FormInputComponent,
    select: FormSelectComponent,
    editor: FormTextEditorComponent,
    textarea: FormTextareaComponent,
    hidden: FormInputHiddenComponent,
    radio: FormRadioComponent,
    checkbox: FormCheckboxComponent,
    label: FormLabelComponent,
    date: FormDateComponent
};

@NgModule({
    imports: [
        CommonModule,
        TagInputModule,
        QuillModule,
        NgbModule
    ],
    declarations: [
        FormInputComponent,
        FormSelectComponent,
        FormTextEditorComponent,
        FormTextareaComponent,
        FormInputHiddenComponent,
        FormRadioComponent,
        FormCheckboxComponent,
        FormLabelComponent,
        FormDateComponent,
    ],
    exports: [
        FormInputComponent,
        FormSelectComponent,
        FormTextEditorComponent,
        FormTextareaComponent,
        FormInputHiddenComponent,
        FormRadioComponent,
        FormCheckboxComponent,
        FormLabelComponent,
        FormDateComponent,
    ],
    entryComponents: [
        FormInputComponent,
        FormSelectComponent,
        FormTextEditorComponent,
        FormTextareaComponent,
        FormInputHiddenComponent,
        FormRadioComponent,
        FormCheckboxComponent,
        FormLabelComponent,
        FormDateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormFieldsModule { }
