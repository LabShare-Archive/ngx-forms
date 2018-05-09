import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { QuillModule } from "ngx-quill";

import { DynamicFieldDirective } from './app/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './app/containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './app/components/form-input/form-input.component';
import { FormSelectComponent } from './app/components/form-select/form-select.component';
import { FormTextareaComponent } from './app/components/form-textarea/form-textarea.component'
import { FormTextEditorComponent } from './app/components/form-text-editor/form-text-editor.component';
import { FormInputHidden } from './app/components/form-hidden/form-hidden.component';
import { FormUserComponent } from './app/components/form-user/form-user.component';
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { DataService } from './app/services/data.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        QuillModule,
        TagInputModule
    ],
    declarations: [
        FormInputHidden,
        FormTextEditorComponent,
        DynamicFieldDirective,
        DynamicFormComponent,
        FormInputComponent,
        FormSelectComponent,    
        FormTextareaComponent,
        FormUserComponent
    ],
    exports: [
        DynamicFormComponent
    ],
    entryComponents: [
        FormInputHidden,
        FormInputComponent,
        FormSelectComponent,
        FormTextEditorComponent,
        FormTextareaComponent,
        FormUserComponent
    ],
    providers: [
        DataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NgxFormModule { }