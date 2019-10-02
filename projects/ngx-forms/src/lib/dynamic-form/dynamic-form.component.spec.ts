import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from "@angular/core";
import { DynamicFormDirective } from "./dynamic-form.component";
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldDictionary, FIELD_DICT_TOKEN, FieldConfig, Field, LAYOUTS_TOKEN } from '../common/types';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'layout-group-group',
    template: '<div></div>'
})
export class LayoutComponent { }

@Component({
    selector: 'form-input',
    template: '<div [formGroup]="group"><input [formControlName]="field.name"></div>'
})
export class FormInputComponent implements Field {
    field: FieldConfig;
    group: FormGroup;
}

const defaultInputs: FieldDictionary = { text: FormInputComponent }
const layouts = { test: LayoutComponent }

@Component({ template: `<dynamic-form [formConfig]="formConfig" #form="dynamicForm" [model]="data" ></dynamic-form>` })
class TestComponent {
    formConfig
    data: {};
    dynamicForm: {};
    model: any
}

@NgModule({
    declarations: [FormInputComponent, LayoutComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    entryComponents: [FormInputComponent, LayoutComponent]
})
class TestModule { }

describe('DynamicFormDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let model = { test: 'test', title: 'title' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, DynamicFormDirective],
            imports: [FormsModule, ReactiveFormsModule, TestModule],
            providers: [{ provide: FIELD_DICT_TOKEN, useValue: defaultInputs },
            { provide: LAYOUTS_TOKEN, useValue: layouts }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.formConfig = {
            layout: 'test',
            form: [
                { label: 'fields and panels', panels: [{ label: 'fields', fields: [{ type: 'text', name: 'title', required: true }] }] },
                { label: 'fields, no panels', fields: [{ type: 'text', name: 'test', required: true }] },
                { label: 'no fields with panels', panels: [{ label: 'no fields' }] },
                { label: 'no fields, no panels' }
            ]
        };
        component.model = model;
    });

    describe('createControl()', () => {
        let dir: DynamicFormDirective;
        let directiveEl;

        beforeEach(() => {
            fixture.detectChanges();
            TestBed.compileComponents();
            directiveEl = fixture.debugElement.query(By.directive(DynamicFormDirective));
            dir = directiveEl.injector.get(DynamicFormDirective);
        });


        it('should call changes()', () => {
            expect(dir.changes).toEqual(dir.group.valueChanges);
        });

        it('should call valid()', () => {
            expect(dir.valid).toEqual(dir.group.valid);
        });

        it('should call value()', () => {
            expect(dir.value).toEqual(dir.group.value);
        });

        it('should call value()', () => {
            expect(dir.rawValue).toEqual(dir.group.getRawValue());
        });

        describe('ngAfterViewInit()', () => {

            it('sets ReadOnly mode to false by default', () => {
                dir.ngAfterViewInit();
                expect(dir.group.disabled).toBeFalsy();
            });

            it('sets ReadOnly mode to true', () => {
                dir.readOnly = true
                dir.ngAfterViewInit();
                expect(dir.group.disabled).toBeTruthy();
            });
    
        });

    });

    describe('createControl()', () => {
        let dir: DynamicFormDirective;
        let directiveEl;

        beforeEach(() => {
            component.formConfig = {
                layout: 'segsegsgs',
                form: [
                    { label: 'fields and panels', panels: [{ label: 'fields', fields: [{ type: 'text', name: 'title', required: true }] }] }
                ]
            };
        });
        it('should not throw error', () => {
            expect(() => {
                fixture.detectChanges();
            }).toThrowError()
        });
    });
});
