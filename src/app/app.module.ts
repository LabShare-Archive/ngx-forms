import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormDirective } from './dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FIELD_DICT_TOKEN, LAYOUTS_TOKEN, FormsExtensions, LayoutDictionary } from '../types';
import { Fields, FieldComponents, CustomInputs } from './fields';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BasicLayoutComponent } from './layouts/basic/basic-layout.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';

const defaultLayouts: LayoutDictionary = {
    basic: BasicLayoutComponent
};

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        QuillModule.forRoot(),
        NgbModule
    ],
    declarations: [
        DynamicFormDirective,
        FieldComponents,
        CustomInputs,
        BasicLayoutComponent,
        DynamicFieldDirective
    ],
    entryComponents: [
        FieldComponents,
        BasicLayoutComponent
    ],
    exports: [
        DynamicFieldDirective,
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
// todo: refactor file structure, add themes and layouts
