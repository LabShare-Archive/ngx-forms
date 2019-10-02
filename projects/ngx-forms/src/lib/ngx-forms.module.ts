import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDirective } from './dynamic-form/dynamic-form.component';
import { FIELD_DICT_TOKEN, LAYOUTS_TOKEN, FormsExtensions } from './common/types';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { DefaultLayoutComponent } from './layouts/default/default-layout.component';
import { MulticheckboxControlComponent } from './fields/multicheckbox/multicheckbox-control/multicheckbox-control.component';
import { JsonControlValueAccessorComponent } from './fields/json/json-control/json-control.component';
import { DefaultLayouts } from './layouts';
import { FieldComponents, DefaultFields } from './fields';

export const CustomInputs = [
  MulticheckboxControlComponent,
  JsonControlValueAccessorComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    FieldComponents,
    DynamicFormDirective,
    DynamicFieldDirective,
    CustomInputs,
    DefaultLayoutComponent
  ],
  entryComponents: [
    FieldComponents,
    DefaultLayoutComponent
  ],
  exports: [
    DynamicFieldDirective,
    DynamicFormDirective,
  ],
  providers: [
    {
      provide: FIELD_DICT_TOKEN,
      useValue: DefaultFields
    },
    {
      provide: LAYOUTS_TOKEN,
      useValue: DefaultLayouts
    }
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NgxFormsModule {
  public static forRoot({ fieldDictionary, layoutDictionary }: FormsExtensions): ModuleWithProviders {
    if (fieldDictionary) { Object.keys(fieldDictionary).forEach(key => DefaultFields[key] = fieldDictionary[key]); }
    if (layoutDictionary) { Object.keys(layoutDictionary).forEach(key => DefaultLayouts[key] = layoutDictionary[key]); }

    return {
      ngModule: NgxFormsModule,
      providers: [
        {
          provide: FIELD_DICT_TOKEN,
          useValue: DefaultFields
        },
        {
          provide: LAYOUTS_TOKEN,
          useValue: DefaultLayouts
        }
      ]
    };
  }
}
