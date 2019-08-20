[![Greenkeeper badge](https://badges.greenkeeper.io/LabShare/ngx-forms.svg?token=4a12f6b1da0f082ac1bbf2c72bbcaf01b001705746c61c36eee1db6bda3d7c11&ts=1528346534395)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.com/LabShare/ngx-forms.svg?token=zsifsALL6Np5avzzjVp1&branch=master)](https://travis-ci.com/LabShare/ngx-forms)

# ngx-forms

Dynamic form generator, creates Angular Reactive forms from json schema

![Alt text](/imgs/readmess.png?raw=true "Optional Title")

## Installation
Install Package
`npm i --save @labshare/ngx-forms`

Add import to the main module
```typescript
import { NgxFormModule } from '@labshare/ngx-forms';

@NgModule({
  imports: [
    NgxFormModule
  ]
})
```

Add html tag with bindings
```html
<dynamic-form [formConfig]="config" #form="dynamicForm" [model]="data"></dynamic-form>
```

- `config` - json array that contains fields definitions
- `#form="dynamicForm"` - Output. Bind to `dynamicForm` object that has form output object
- `model` - Input data. One way binding only

Add reference in the component controller 
```typescript
export class MyFormComponent {
    @ViewChild('form') public formReference: DynamicFormDirective;

    public const config = {
      layout: 'basic',
      fields: [ 
        { type: 'text', label: 'Title', name: 'title' },
        { type: 'text', label: 'Project Name', name: 'projectName', placeholder: 'Enter project name', minLength: 2, maxLength: 5 },
      ]
    };
 
    public const model = { title: 'Example', projectName: 'Demo' }
    
}
```

## Extending form
ngx-forms can be extended with custom layout or custom inputs

```typescript
export const customFields = {
  peoplePicker: PeoplePickerComponent,
};

export const customLayouts: LayoutDictionary = {
  myCustomLayout: CustomLayoutComponent,
};

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxFormModule.forRoot({
      layoutDictionary: customLayouts,
      fieldDictionary: customFields,
    }),
  ],
  declarations: [PeoplePickerComponent],
  entryComponents: [CustomLayoutComponent, PeoplePickerComponent],
})
export class NgxFormsExtensionsModule {}
```

then use custom fields and layouts in the form config:
```javascript
{  
    layout: 'myCustomLayout',
    fields: [ 
        { type: 'text', label: 'Title', name: 'title' },
        { type: 'peoplePicker', label: 'People', name: 'people' },
    ]
};
```

### Creating custom layouts
Custom layout component needs to extend `BaseLayout` from `ngx-forms`:
```typescript
import { Component } from '@angular/core';
import { BaseLayout } from '@labshare/ngx-forms/src/app/layouts/base-layout';

@Component({
  selector: 'custom-forms-layout',
  template: require('./custom-layout.component.html'),
})
export class CustomLayoutComponent extends BaseLayout {}
```
Custom layout template must have entry directive `dynamicField` through which an input will be injected:
```html
<div class="row">
    <div class="col-12">
        <div *ngFor="let field of formConfig.fields" class="mb-2">
            <ng-container *ngIf="!field.hidden">
                <label>{{field.label}}
                </label>
                <div dynamicField [field]="field" [group]="group" [model]="model"></div>
            </ng-container>
        </div>
    </div>
</div>
```
### Creating custom inputs
Inputs can be of any kind and return objects, arrays, strings etc. 

Creating and field itself is not difficult but in most cases you may have to create a custom `ControlValueAccessor`

Custom field must implement `Field` interface from `ngx-forms`
```typescript
import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig, Field} from '@labshare/ngx-forms';

@Component({
  selector: 'field-editor',
  template: require('./field-editor.component.html'),
})
export class PeoplePickerComponent implements Field {
  public field: FieldConfig;
  public group: FormGroup;
}
```
And template:
```html
<ng-container [formGroup]="group">
    <people-picker-accessor [options]="field.options" [formControlName]="field.name"></people-picker-accessor>
</ng-container>
```
In this case `people-picker-accessor` is a custom `ControlValueAccessor`

### Overwriting existing types
It is possible to overwrite existing out of the box fields and layouts by simply using their names in the dictionary in `forRoot`. For example if you need to overwrite `text` input field:
```typescript
export const customFields = {
  text: PeoplePickerComponent,
};
```

## Field options and examples
Name | Type | Description | Example
-- | -- | -- | --
`disabled?` | `boolean` | disable field if `true` | `disabled: true`
`label?` | `string` | field label | `label: "Project Title"`
`name` | `string` | field name | `name: "projectTitle"`
`options?` | `string[]` | options for `<select>` dropdown | `options: [ "Option 1", "Option 2" ]`
`placeholder?` | `string` | text placeholder | `placeholder: "Enter Project Title"`
`type` | `string` | field type (see field type description) | `type: "select"`
`value?` | `any` | field value | `value: 123`
`required?` | `boolean` | Validation: required or not | `required: true`
`minLength?` | `number` | Validation: minimum length of a text field | `minLength: 5`
`maxLength?` | `number` | Validation: maximum length of a text field | `maxLength: 12`
`email?` | `boolean` | Validation: field must be an email address | `email: true`
`min?` | `number` | Validation: minumum value for number fields | `min: 100`
`max?` | `number` | Validation: maximum value for number fields | `max: 1000`
`pattern?` | `RegExp` | Validation: regular expression | `pattern: "^[a-zA-Z0-9_]*$"`
`nullValidator?` | `any` | Validation: null validation | `nullValidator: true`
`hidden` | `boolean` | hide the field by default when the form loading| `hidden: true`


## Out of box field types:
- `text` - text input `<input type="text">`
- `select` - text input `<select>`
- `textarea` - text input `<textarea>`
- `editor` - Rich text editor based on `ngx-quill`
- `hidden` - hidden value field `<input type="hidden">`.
- `radio` - radio buttons
- `checkbox` - checkbox buttons
- `date` - datepicker