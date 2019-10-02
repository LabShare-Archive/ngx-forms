import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormDirective } from './dynamic-form/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FIELD_DICT_TOKEN, LAYOUTS_TOKEN, FormsExtensions, LayoutDictionary, FieldDictionary } from './types';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { BasicLayoutComponent } from './layouts/default/basic-layout.component';
import { FormInputComponent } from './fields/input/form-input.component';
import { FormSelectComponent } from './fields/select/form-select.component';
import { FormCheckboxComponent } from './fields/checkbox/form-checkbox.component';
import { FormMultiCheckboxComponent } from './fields/multicheckbox/form-multicheckbox.component';
import { FormRadioComponent } from './fields/radio/form-radio.component';
import { FormTextareaComponent } from './fields/textarea/form-textarea.component';
import { FormInputHiddenComponent } from './fields/hidden/form-hidden.component';
import { FormLabelComponent } from './fields/label/form-label.component';
import { MulticheckboxControlComponent } from './fields/multicheckbox/multicheckbox-control/multicheckbox-control.component';
import { FormJsonComponent } from './fields/json/form-json.component';
import { JsonControlValueAccessorComponent } from './fields/json/json-control/json-control.component';

export const Fields: FieldDictionary = {
  text: FormInputComponent,
  select: FormSelectComponent,
  multicheckbox: FormMultiCheckboxComponent,
  textarea: FormTextareaComponent,
  hidden: FormInputHiddenComponent,
  radio: FormRadioComponent,
  checkbox: FormCheckboxComponent,
  label: FormLabelComponent,
  json: FormJsonComponent
};

export const FieldComponents = [
  FormInputComponent,
  FormSelectComponent,
  FormMultiCheckboxComponent,
  FormTextareaComponent,
  FormInputHiddenComponent,
  FormRadioComponent,
  FormCheckboxComponent,
  FormLabelComponent,
  FormJsonComponent
];

export const CustomInputs = [
  MulticheckboxControlComponent,
  JsonControlValueAccessorComponent
];

const defaultLayouts: LayoutDictionary = {
  default: BasicLayoutComponent
};

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    FieldComponents,
    DynamicFormDirective,
    DynamicFieldDirective,
    CustomInputs,
    BasicLayoutComponent
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
export class NgxFormsModule {
  public static forRoot({ fieldDictionary, layoutDictionary }: FormsExtensions): ModuleWithProviders {
    if (fieldDictionary) { Object.keys(fieldDictionary).forEach(key => Fields[key] = fieldDictionary[key]); }
    if (layoutDictionary) { Object.keys(layoutDictionary).forEach(key => defaultLayouts[key] = layoutDictionary[key]); }

    return {
      ngModule: NgxFormsModule,
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
