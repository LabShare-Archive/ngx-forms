import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DynamicFieldDirective } from './app/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './app/containers/dynamic-form/dynamic-form.component';
import { DynamicPanelComponent } from './app/containers/dynamic-panel/dynamic-panel.component';
import { FormNavModule } from './nav/nav-app';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormInputComponent } from './app/components/form-input/form-input.component';
import { FormSelectComponent } from './app/components/form-select/form-select.component';
import { FormTextEditorComponent } from './app/components/form-text-editor/form-text-editor.component';
import { FormCheckboxComponent } from './app/components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './app/components/form-radio/form-radio.component';
import { FormTextareaComponent } from './app/components/form-textarea/form-textarea.component';
import { FormInputHiddenComponent } from './app/components/form-hidden/form-hidden.component';
import { FormLabelComponent } from './app/components/form-label/form-label.component';
import { FormDateComponent } from './app/components/form-date/form-date.component';
import { FIELD_DICT_TOKEN, FieldDictionary } from './app/types';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupLayoutFormComponent } from './app/containers/group-layout/group-layout.component';

const defaultInputs: FieldDictionary = {
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
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        QuillModule,
        TagInputModule,
        FormNavModule,
        NgbModule
    ],
    declarations: [
        DynamicFieldDirective,
        DynamicFormComponent,
        DynamicPanelComponent,
        FormInputComponent,
        FormSelectComponent,
        FormTextEditorComponent,
        FormTextareaComponent,
        FormInputHiddenComponent,
        FormRadioComponent,
        FormCheckboxComponent,
        FormLabelComponent,
        FormDateComponent,
        GroupLayoutFormComponent
    ],
    exports: [
        DynamicFormComponent
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
        FormDateComponent,
        GroupLayoutFormComponent
    ],
    providers: [
        {
            provide: FIELD_DICT_TOKEN,
            useValue: defaultInputs
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NgxFormModule {
    public static forRoot(dictionary: FieldDictionary): ModuleWithProviders {
        Object.keys(dictionary).forEach(key => defaultInputs[key] = dictionary[key]);
        return {
            ngModule: NgxFormModule,
            providers: [
                {
                    provide: FIELD_DICT_TOKEN,
                    useValue: defaultInputs
                }
            ]
        };
    }
}


// TODO: next
// create provider for layout
// add ability to inject custom layouts within a module (by importing provider)
// create different default layouts for ngx-forms 