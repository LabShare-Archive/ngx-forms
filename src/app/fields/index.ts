import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTextEditorComponent } from './form-text-editor/form-text-editor.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormMultiCheckboxComponent } from './form-multicheckbox/form-multicheckbox.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { FormInputHiddenComponent } from './form-hidden/form-hidden.component';
import { FormLabelComponent } from './form-label/form-label.component';
import { FormDateComponent } from './form-date/form-date.component';
import { FieldDictionary } from '../../types';
import { MulticheckboxControlComponent } from './form-multicheckbox/multicheckbox-control/multicheckbox-control.component';
import { FormJsonComponent } from './form-json/form-json.component';
import { JsonControlValueAccessorComponent } from './form-json/json-control/json-control.component';

export const Fields: FieldDictionary = {
    text: FormInputComponent,
    select: FormSelectComponent,
    multicheckbox: FormMultiCheckboxComponent,
    editor: FormTextEditorComponent,
    textarea: FormTextareaComponent,
    hidden: FormInputHiddenComponent,
    radio: FormRadioComponent,
    checkbox: FormCheckboxComponent,
    label: FormLabelComponent,
    date: FormDateComponent,
    json: FormJsonComponent
};

export const FieldComponents = [
    FormInputComponent,
    FormSelectComponent,
    FormMultiCheckboxComponent,
    FormTextEditorComponent,
    FormTextareaComponent,
    FormInputHiddenComponent,
    FormRadioComponent,
    FormCheckboxComponent,
    FormLabelComponent,
    FormDateComponent,
    FormJsonComponent
];

export const CustomInputs = [
    MulticheckboxControlComponent,
    JsonControlValueAccessorComponent
];
