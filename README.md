# ngx-forms
Dynamic form generator. This module provides components that wrap angular 2+ FormBuilder styled with Bootstrap CSS 4

![Alt text](/readmess.png?raw=true "Optional Title")

## Requirements
-   angular 2+

## Installation
`npm install`

## Linking
`npm run build:watch`

## Usage
Add html tag with bindings
`<dynamic-form [config]="config" #form="dynamicForm" [model]="project"></dynamic-form>`
- `config` - json array that contains fields definitions
- `#form="dynamicForm"` - bind to `dynamicForm` object that has form output
- `model` - preload data. One way binding only

## Config example
```json
[
    { type: 'hidden', name: 'id' },
    { type: 'text', label: 'Title', name: 'title', placeholder: 'Enter project title', required: true, max: 14 },
    { type: 'text', label: 'Name', name: 'activityName', placeholder: 'Enter project name', minLength: 2, maxLength: 5 },
]
```

## Field options
- `label?: string` - field label
- `name: string` - field name
- `options?: string[]` - options for `<select>` dropdown
- `placeholder?: string` - text placeholder
- `type: string` - field type (see field type description)
- `value?: any` - field value
- `required?: boolean` - Validation: required or not
- `minLength? : number` - Validation: minimum length of a text field
- `maxLength? : number` - Validation: maximum length of a text field
- `email? : boolean` - Validation: field must be an email address
- `min?: number` - Validation: minumum value for number fields
- `max?: number` - Validation: maximum value for number fields
- `pattern?: RegExp` - Validation: regular expression
- `nullValidator?: any` - Validation: null validation

## Field types
- `text` - text input `<input type="text">`
- `select` - text unput `<select>`
- `textarea` - text input `<textarea>`
- `editor` - Rich text editor based on `ngx-quill`
- `hidden` - hidden value field `<input type="hidden">`.
