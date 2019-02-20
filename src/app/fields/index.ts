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

export const Fields: FieldDictionary = {
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

export const FieldComponents = [
    FormInputComponent,
    FormSelectComponent,
    FormTextEditorComponent,
    FormTextareaComponent,
    FormInputHiddenComponent,
    FormRadioComponent,
    FormCheckboxComponent,
    FormLabelComponent,
    FormDateComponent,
];