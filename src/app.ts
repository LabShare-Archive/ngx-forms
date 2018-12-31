import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DynamicFieldDirective } from './app/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './app/containers/dynamic-form/dynamic-form.component';
import { DynamicPanelComponent } from './app/containers/dynamic-panel/dynamic-panel.component';
import { FormNavModule } from './nav/nav-app';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFieldService } from './app/services/dynamic-field.service';
import { PreloadService, Components } from './app/services/preload.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        QuillModule,
        TagInputModule,
        FormNavModule
    ],
    declarations: [
        Components,
        DynamicFieldDirective,
        DynamicFormComponent,
        DynamicPanelComponent
    ],
    exports: [
        DynamicFormComponent
    ],
    entryComponents: [
        Components
    ],
    providers: [
        DynamicFieldService,
        PreloadService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NgxFormModule { }

export { DynamicFieldService };
