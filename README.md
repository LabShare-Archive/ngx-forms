[![Greenkeeper badge](https://badges.greenkeeper.io/LabShare/ngx-forms.svg?token=4a12f6b1da0f082ac1bbf2c72bbcaf01b001705746c61c36eee1db6bda3d7c11&ts=1528346534395)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.com/LabShare/ngx-forms.svg?token=zsifsALL6Np5avzzjVp1&branch=master)](https://travis-ci.com/LabShare/ngx-forms)

# ngx-forms

Dynamic form generator. This module provides components that wrap angular 2+ FormBuilder styled with Bootstrap CSS 4
![Alt text](/imgs/readmess.png?raw=true "Optional Title")

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
```javascript
[
    { type: 'hidden', name: 'id' },
    { type: 'text', label: 'Title', name: 'title', placeholder: 'Enter project title', required: true, max: 14 },
    { type: 'text', label: 'Name', name: 'activityName', placeholder: 'Enter project name', minLength: 2, maxLength: 5 },
]
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

## Field types:
- `text` - text input `<input type="text">`
- `select` - text unput `<select>`
- `textarea` - text input `<textarea>`
- `editor` - Rich text editor based on `ngx-quill`
- `hidden` - hidden value field `<input type="hidden">`.
- `radio` - radio buttons
- `checkbox` - checkbox buttons

