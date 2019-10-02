import { Component, NgModule } from '@angular/core';
import { Field, FieldConfig, FieldDictionary, FIELD_DICT_TOKEN, FormConfig } from '../../common/types';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed
 } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import { DynamicFormDirective} from '../../dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from '../../dynamic-field/dynamic-field.directive';

@Component({
    selector: 'form-input',
    template: '<div [formGroup]="group"><input [formControlName]="field.name"></div>'
})
export class FormInputComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}

const defaultInputs: FieldDictionary = {
    text: FormInputComponent
};

@Component({
    template: `<dynamic-form [formConfig]="formConfig" #form="dynamicForm" [model]="data"></dynamic-form>`
})
class TestComponent {
    formConfig;
    data: {};
    dynamicForm: {};
}

@NgModule({
    declarations: [FormInputComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormInputComponent, DefaultLayoutComponent]
})
class TestModule { }

describe('BasicLayoutComponent Core', () => {
    let component: DefaultLayoutComponent;
    let fixture: ComponentFixture<DefaultLayoutComponent>;
    const model = { test: 'test', title: 'title' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective, TestComponent, DefaultLayoutComponent, DynamicFormDirective],
            imports: [FormsModule, ReactiveFormsModule, TestModule],
            providers: [{ provide: FIELD_DICT_TOKEN, useValue: defaultInputs }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultLayoutComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({});
        component.formConfig = {
            form: [
                { label: 'fields and panels', panels: [{ label: 'fields', fields: [{ type: 'text', name: 'title', required: true }] }] },
                { label: 'fields, no panels', fields: [{ type: 'text', name: 'test', required: true }] },
                { label: 'no fields with panels', panels: [{ label: 'no fields' }] },
                { label: 'no fields, no panels' }
            ]
        } as FormConfig;
        component.model = model;
        fixture.detectChanges();
    });

    describe('ngOnInit()', () => {

        it('should create group', () => {
            expect(component.group).toBeDefined();
        });

    });

});
