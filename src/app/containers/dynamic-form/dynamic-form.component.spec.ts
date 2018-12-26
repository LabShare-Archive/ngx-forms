import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPanelComponent } from '../dynamic-panel/dynamic-panel.component';
import { DynamicFieldDirective } from '../../components/dynamic-field/dynamic-field.directive';
import { Component, NgModule } from "@angular/core";
import { DynamicFormComponent } from "./dynamic-form.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFieldService } from "../../services/dynamic-field.service";
import { PreloadService } from '../../services/preload.service';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { FormSelectComponent } from '../../components/form-select/form-select.component';
import { FormInputHiddenComponent } from '../../components/form-hidden/form-hidden.component';
import { By } from '@angular/platform-browser';
import { FormNavModule } from '../../../nav/nav-app';
import { FieldConfigService } from '../../services/field-config.service';

interface IFormConfig {
    form: any;
    fields: any[]
}

interface IDynamicForm {
    formConfig: IFormConfig
    data: any
    dynamicForm: any
    lookups: any
}

@Component({
    template: `<dynamic-form [formConfig]="formConfig" #form="dynamicForm" [model]="data" [dataProvider]="dataProvider" [lookups]="lookups"></dynamic-form>`
})
class TestComponent implements IDynamicForm {
    formConfig
    data: {};
    dynamicForm: {};
    lookups: {};
}

@NgModule({
    declarations: [FormInputComponent, FormSelectComponent, FormInputHiddenComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, FormNavModule],
    entryComponents: [FormInputComponent, FormSelectComponent, FormInputHiddenComponent]
})
class TestModule { }

describe('DynamicFormComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective, TestComponent, DynamicFormComponent, DynamicPanelComponent],
            imports: [FormsModule, ReactiveFormsModule, TestModule, FormNavModule],
            providers: [DynamicFieldService, PreloadService, FieldConfigService]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TestComponent);
                component = fixture.componentInstance;
                component.formConfig = {
                    fields: [
                        { type: 'hidden', name: 'id' },
                        { type: 'text', label: 'Publication Title:', name: 'title', placeholder: '', required: true },
                        { type: 'select', label: 'Publication Type', name: 'activityType', options: ['a', 'b'] }
                    ],
                    form: [{ label: 'Title and Abstract', panels: [{ label: 'Title and Abstract', fields: ['id', 'title', 'activityType'] }] }]
                }

                fixture.detectChanges();
            });
    }));

    it('loads input-hidden component', () => {
        directiveEl = fixture.debugElement.query(By.directive(FormInputHiddenComponent));
        expect(directiveEl).not.toBeNull();
    });

    it('loads input-select component', () => {
        directiveEl = fixture.debugElement.query(By.directive(FormSelectComponent));
        expect(directiveEl).not.toBeNull();
    });

    it('loads dynamic-panel component', () => {
        directiveEl = fixture.debugElement.query(By.directive(DynamicPanelComponent));
        expect(directiveEl).not.toBeNull();
    });

    it('loads dyncamic-field component', () => {
        directiveEl = fixture.debugElement.query(By.directive(DynamicFieldDirective));
        expect(directiveEl).not.toBeNull();
    });

    it('loads form-input component', () => {
        directiveEl = fixture.debugElement.query(By.directive(FormInputComponent));
        expect(directiveEl).not.toBeNull();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

describe('DynamicFormComponent Core', () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;
    let model = { test: 'test', title: 'title' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFieldDirective, TestComponent, DynamicFormComponent, DynamicPanelComponent],
            imports: [FormsModule, ReactiveFormsModule, TestModule, FormNavModule],
            providers: [DynamicFieldService, PreloadService, FieldConfigService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        component.formConfig = {
            fields: [
                { type: 'hidden', name: 'id' },
                { type: 'text', name: 'title', required: true },
                { type: 'text', name: 'test', required: true }
            ],
            form: [
                { label: 'fields and panels', panels: [{ label: 'fields', fields: ['title'] }] },
                { label: 'fields, no panels', fields: ['test'] },
                { label: 'no fields with panels', panels: [{ label: 'no fields' }] },
                { label: 'no fields, no panels' }
            ]
        };
        component.model = model;
        fixture.detectChanges();
    });

    describe('ngOnInit()', () => {
        it('should add fields references to config group', () => {
            expect(component.formConfig.form[0].controls.length).toEqual(1);
        });

        it('should add fields references to config group with no panels', () => {
            expect(component.formConfig.form[1].controls.length).toEqual(1);
        });

        it('should not add fields references to config group with no panels', () => {
            expect(component.formConfig.form[2].controls.length).toEqual(0);
        });

        it('should not add fields references to config group with no panels no fields', () => {
            expect(component.formConfig.form[3].controls.length).toEqual(0);
        });

        it('should patch model', () => {
            expect(component.form.value.title).toEqual(model.title);
        });

        it('should not patch model', () => {
            component.model = null;
            component.ngOnInit();
            expect(component.form.value.title).toBeUndefined();
        });

        describe('Lookup Expansion', () => {
            it('should not set lookup when there is no lookup in field', () => {
                component.lookups = { test: ['a', 'b', 'c'] };
                component.formConfig = { fields: [{ type: 'text', name: 'title' }], form: [] };
                component.ngOnInit();
                expect(component.formConfig.fields[0].options).toBeUndefined();
            });

            it('should not find lookup when no lookups were passed', () => {
                component.lookups = null;
                component.formConfig = { fields: [{ type: 'text', name: 'title', lookup: 'test' }], form: [] };
                component.ngOnInit();
                expect(component.formConfig.fields[0].options).toBeUndefined();
            });

            it('should not find lookup when no lookups found', () => {
                component.lookups = { test: ['a', 'b', 'c'] };;
                component.formConfig = { fields: [{ type: 'text', name: 'title', lookup: 'test1' }], form: [] };
                component.ngOnInit();
                expect(component.formConfig.fields[0].options).toBeUndefined();
            });

            it('should copy lookup', () => {
                component.lookups = { test: ['a', 'b', 'c'] };;
                component.formConfig = { fields: [{ type: 'text', name: 'title', lookup: 'test' }], form: [] };
                component.ngOnInit();
                expect(component.formConfig.fields[0].options).toBeDefined();
            });

            it('should copy lookup', () => {
                component.lookups = { test: ['a', 'b', 'c'] };;
                component.formConfig = { fields: [{ type: 'text', name: 'title', lookup: 'test' }], form: [] };
                component.ngOnInit();
                expect(component.formConfig.fields[0].options).toEqual(['a', 'b', 'c']);
            });

            it('should extract lookup', () => {
                component.lookups = { test: [{ t: 'a' }, { t: 'b' }, { t: 'c' }] };;
                component.formConfig = { fields: [{ type: 'text', name: 'title', lookup: 'test', extract: 't' }], form: [] };
                component.ngOnInit();
                expect(component.formConfig.fields[0].options).toEqual(['a', 'b', 'c']);
            });


        });
    });

    describe('createControl()', () => {
        let cfg = { name: 'test', type: 'text', disabled: true, required: true, minLength: 5, maxLength: 10, email: true, min: 1, max: 10, pattern: new RegExp('\d'), nullValidator: true, value: 5 };

        it('should set pattern validator', () => {
            let control = component.createControl({ name: 'test', type: 'text', pattern: new RegExp('\d'), value: 5 });
            const vals = control.validator(control);
            expect(vals.pattern).toBeTruthy();
        });

        it('should set email validator', () => {
            let control = component.createControl({ name: 'test', type: 'text', email: true, value: 5 });
            const vals = control.validator(control);
            expect(vals.email).toBeTruthy();
        });

        it('should set min length validator', () => {
            let control = component.createControl({ name: 'test', type: 'text', minLength: 5, maxLength: 10, value: 'test' });
            const vals = control.validator(control);
            expect(vals.minlength).toBeTruthy();
        });

        it('should set max length validator', () => {
            let control = component.createControl({ name: 'test', type: 'text', maxLength: 2, value: 'test' });
            const vals = control.validator(control);
            expect(vals.maxlength).toBeTruthy();
        });

        it('should set required validator', () => {
            let control = component.createControl({ name: 'test', type: 'text', required: true, value: '' });
            const vals = control.validator(control);
            expect(vals.required).toBeTruthy();
        });

        it('should set min value validator', () => {
            let control = component.createControl({ name: 'test', type: 'text', min: 2, value: 1 });
            const vals = control.validator(control);
            expect(vals.min).toBeTruthy();
        });

        it('should set max value validator', () => {
            let control = component.createControl({ name: 'test', type: 'text', max: 2, value: 22 });
            const vals = control.validator(control);
            expect(vals.max).toBeTruthy();
        });

        it('should set value', () => {
            let control = component.createControl(cfg);
            expect(control.value).toEqual(cfg.value);
        });

    });
});
