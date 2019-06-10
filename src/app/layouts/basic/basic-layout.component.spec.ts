import { Component, NgModule } from "@angular/core";
import { Field, FieldConfig, FieldDictionary, FIELD_DICT_TOKEN, FormConfig } from "../../../types";
import { FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { DynamicFieldDirective } from "../../dynamic-field/dynamic-field.directive";
import { BasicLayoutComponent } from './basic-layout.component';
import { DynamicFormDirective} from '../../dynamic-form/dynamic-form.component';

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
}

@Component({
    template: `<dynamic-form [formConfig]="formConfig" #form="dynamicForm" [model]="data"></dynamic-form>`
})
class TestComponent {
    formConfig
    data: {};
    dynamicForm: {};
}

@NgModule({
    declarations: [FormInputComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormInputComponent, BasicLayoutComponent]
})
class TestModule { }

describe('BasicLayoutComponent Core', () => {
    let component: BasicLayoutComponent;
    let fixture: ComponentFixture<BasicLayoutComponent>;
    let model = { test: 'test', title: 'title' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective, TestComponent, BasicLayoutComponent, DynamicFormDirective],
            imports: [FormsModule, ReactiveFormsModule, TestModule],
            providers: [{ provide: FIELD_DICT_TOKEN, useValue: defaultInputs }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicLayoutComponent);
        component = fixture.componentInstance;
        component.group = new FormGroup({})
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
