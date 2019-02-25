import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormDirective } from './dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FIELD_DICT_TOKEN, LAYOUTS_TOKEN, FormsExtensions } from '../types';
import { Fields, FieldComponents } from './fields';
import { FormLayoutsModule, defaultLayouts } from './layouts/layouts.module';
import { DynamicFieldModule } from './dynamic-field/dynamic-field.module';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        FormLayoutsModule,
        DynamicFieldModule,
        QuillModule,
        NgbModule
    ],
    declarations: [
        DynamicFormDirective,
        FieldComponents
    ],
    entryComponents: [
        FieldComponents
    ],
    exports: [
        DynamicFormDirective,
    ],
    providers: [
        {
            provide: FIELD_DICT_TOKEN,
            useValue: Fields
        },
        {
            provide: LAYOUTS_TOKEN,
            useValue: defaultLayouts
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NgxFormModule {
    public static forRoot({ fieldDictionary, layoutDictionary }: FormsExtensions): ModuleWithProviders {
        if (fieldDictionary) { Object.keys(fieldDictionary).forEach(key => Fields[key] = fieldDictionary[key]); }
        if (layoutDictionary) { Object.keys(layoutDictionary).forEach(key => defaultLayouts[key] = layoutDictionary[key]); }

        return {
            ngModule: NgxFormModule,
            providers: [
                {
                    provide: FIELD_DICT_TOKEN,
                    useValue: Fields
                },
                {
                    provide: LAYOUTS_TOKEN,
                    useValue: defaultLayouts
                }
            ]
        };
    }
}

// todo: be able to export full form with buttons, or just form as object editor
