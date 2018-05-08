import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from "ngx-quill";

import { DynamicFieldDirective } from './app/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './app/containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './app/components/form-input/form-input.component';
import { FormSelectComponent } from './app/components/form-select/form-select.component';
import { FormTextareaComponent } from './app/components/form-textarea/form-textarea.component'
import { FormTextEditorComponent } from './app/components/form-text-editor/form-text-editor.component';
import { FormInputHidden } from './app/components/form-hidden/form-hidden.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule
  ],
  declarations: [
    FormInputHidden,
    FormTextEditorComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormInputHidden,
    FormInputComponent,
    FormSelectComponent,
    FormTextEditorComponent,
    FormTextareaComponent
  ]
})
export class NgxFormModule {}